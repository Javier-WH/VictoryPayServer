const Student = require("../SQL/models/students.model");
const {getParentById} = require("./parents.controller");
const {getTutorById} = require("./tutors.controller");
const {getAddressByStudentId} = require("./address.controller");
const {getContactInfoByStudentId} = require("./contact_info.controller");
const {getMedicalInfoByStudentId} = require("./medicalInfo.controller");
const {getInscriptionPaimentByStudentId} = require("./inscription_payment.controller");


async function insertStudent({ code, studentName, studentLastName, studentCi, studentNation, seccion, grade, gender, birthDate, age }, parent_id, tutor_id, transaction) {


    let insert = await Student.create({
        name: studentName,
        lastName: studentLastName,
        ci: studentCi,
        nation: studentNation,
        seccion: seccion,
        grade: grade,
        gender: gender,
        code: code,
        age: age,
        birthDate: birthDate,
        parent_id,
        tutor_id
    }, {
        transaction
    });
    return insert.dataValues.id;

}
//
async function updateStudentById({ code, studentName, studentLastName, studentCi, studentNation, seccion, grade, gender, birthDate, age }, id, parent_id, tutor_id, transaction) {
   
    let update = await Student.update({
        name: studentName,
        lastName: studentLastName,
        ci: studentCi,
        nation: studentNation,
        seccion: seccion,
        grade: grade,
        gender: gender,
        code: code,
        age: age,
        birthDate: birthDate,
        parent_id,
        tutor_id
    }, {
        where:{
            id
        },
        transaction
    });
    return update.dataValues.id;

}




///

async function getStudentByCode(code, transaction) {


    let ask = await Student.findAll({
        where: {
            code
        }
    }, {
        transaction
    });

    if (ask.length > 0) {
        return ask[0];
    }

    return null;


}
//
async function getStudentIdByCi(ci, transaction) {


    let ask = await Student.findAll({
        where: {
            ci
        }
    }, {
        transaction
    });

    if (ask.length > 0) {
        return ask[0].dataValues.id;
    }

    return null;


}
//
async function getStudentParentsIdAndTutorIdByCi(ci, transaction) {


    let ask = await Student.findAll({
        where: {
            ci
        }
    }, {
        transaction
    });

    if (ask.length > 0) {
        return {
            parents_id : ask[0].dataValues.parent_id,
            tutor_id: ask[0].dataValues.tutor_id
        }
    }

    return null;


}


//

async function getStudentByCi(ci, transaction) {


    let ask = await Student.findAll({
        where: {
            ci
        }
    }, {
        transaction
    });

    if (ask.length > 0) {
        let student = ask[0].dataValues;
        let parents = await getParentById(student.parent_id, transaction);
        let tutor = await getTutorById(student.tutor_id, transaction); 
        let address = await getAddressByStudentId(student.id, transaction);
        let contact = await getContactInfoByStudentId(student.id, transaction);
        let medical = await getMedicalInfoByStudentId(student.id, transaction);
        let payment = await getInscriptionPaimentByStudentId(student.id, transaction);
        
        return {
            ...student, 
            ...parents, 
            ...tutor, 
            ...address,
            ...contact,
            ...medical,
            ...payment
        };
    }

    return null;


}

//

async function updateStudentByCi({ code, studentName, studentLastName, studentCi, studentNation, seccion, grade, gender, birthDate, age }, parents_id, tutor_id, transaction) {

    let update = await Student.update({
        name: studentName,
        lastName: studentLastName,
        nation: studentNation,
        seccion: seccion,
        grade: grade,
        gender: gender,
        code: code,
        age: age,
        parents_id,
        tutor_id,
        birthDate: birthDate
    }, {
        where: {
            ci: studentCi
        },
        transaction
    });

    return update;


}
//
async function updateStudentByCode({ code, studentName, studentLastName, studentCi, studentNation, seccion, grade, gender, birthDate, age }, transaction) {


    let update = await Student.update({
        name: studentName,
        lastName: studentLastName,
        ci: studentCi,
        nation: studentNation,
        seccion: seccion,
        grade: grade,
        gender: gender,
        age: age,
        birthDate: birthDate
    }, {
        where: {
            code
        },
        transaction
    });

    return insert.dataValues.id;

}
//



module.exports = { insertStudent, getStudentByCode, getStudentByCi, updateStudentByCi, updateStudentByCode, updateStudentById, getStudentIdByCi, getStudentParentsIdAndTutorIdByCi };
