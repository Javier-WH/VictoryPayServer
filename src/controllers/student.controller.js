const Student = require("../SQL/models/students.model");
const { getParentById } = require("./parents.controller");
const { getTutorById } = require("./tutors.controller");
const { getAddressByStudentId } = require("./address.controller");
const { getContactInfoByStudentId } = require("./contact_info.controller");
const { getMedicalInfoByStudentId } = require("./medicalInfo.controller");
const { getInscriptionPaimentByStudentId } = require("./inscription_payment.controller");
const { getAbono } = require("./abono.controller");
const { Op } = require('@sequelize/core');
const sequelize = require("../SQL/Sequelize/connection");

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
        where: {
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
            parents_id: ask[0].dataValues.parent_id,
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
        let abono = await getAbono(student.tutor_id);

        return {
            ...student,
            ...parents,
            ...tutor,
            ...address,
            ...contact,
            ...medical,
            ...payment,
            ...abono
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

async function getStudentList(requestDate = "01/01/1998 01:01:01") {
 
    let list = await sequelize.query("SELECT DISTINCT students.name, students.lastName, students.ci, students.nation, students.seccion, students.grade, students.gender, students.code, students.birthdate, students.age, students.parent_id, students.tutor_id, students.updatedAt, " 
        + " tutors.tutor_name, tutors.tutor_ci, tutors.tutor_nation, tutor_link, tutors.updatedAT as tutorDate,  " 
        + " parents.mother_name, parents.mother_ci, parents.mother_nation, parents.mother_work, parents.father_name, parents.father_ci, parents.father_nation, parents.father_work, parents.updatedAT as parentsDate,  " 
        + " addresses.birth_country, addresses.birth_state, addresses.birth_municipio, addresses.birth_parroquia, addresses.live_state, addresses.live_municipio, addresses.live_parroquia, addresses.address, addresses.procedence_school, addresses.updatedAT as addressDate, "  
        + " contact_infos.phone1, contact_infos.phone2, contact_infos.email, contact_infos.whatsaap1, contact_infos.whatsaap2, contact_infos.updatedAT as contactDate, " 
        + " medical_infos.diabetes, medical_infos.hipertension, medical_infos.dislexia, medical_infos.daltonismo, medical_infos.epilepsia, medical_infos.asma, medical_infos.alergias, medical_infos.TDAH, medical_infos.observations, medical_infos.updatedAT as medicalDate, " 
        + " inscription_payments.inscription, inscription_payments.cash, inscription_payments.operation_number, inscription_payments.monthlyPrice, inscription_payments.date, inscription_payments.status, inscription_payments.updatedAT as paymentDate, " 
        + " abonos.abono "
        + " FROM students " 
        + " JOIN tutors ON tutors.id = students.tutor_id  " 
        + " JOIN parents ON parents.id = students.parent_id " 
        + " JOIN addresses ON students.id = addresses.student_id " 
        + " JOIN contact_infos ON students.id = contact_infos.student_id " 
        + " JOIN medical_infos ON students.id = medical_infos.student_id " 
        + " JOIN inscription_payments ON students.id = inscription_payments.student_id " 
        + " JOIN abonos ON students.tutor_id = abonos.tutor_id "
        + ` WHERE students.updatedAt > '${requestDate}' ` ,
        {
            type: sequelize.QueryTypes.SELECT,
            raw:true
        }
    );

    if (list.length > 0) {
        return list;
    }
    return {};
}

//////////

async function searchConflicts(data) {

    const records = data.map(student => {
        condition = {};
        condition.ci = student.ci;
        condition.updatedAT = student.updatedAT;
        return condition;
    })

    const conditions = records.map(record => ({
        ci: record.ci,
        updatedAT: {
            [Op.lt]: record.updatedAT
        }
    }));


    const conflicts = await Student.findAll({
        where: {
            [Op.or]: conditions
        },
        raw: true
    });

    let studentConflicts = [];
    for (student of conflicts) {
        let parents = await getParentById(student.parent_id);
        let tutor = await getTutorById(student.tutor_id);
        let address = await getAddressByStudentId(student.id);
        let contact = await getContactInfoByStudentId(student.id);
        let medical = await getMedicalInfoByStudentId(student.id);
        let payment = await getInscriptionPaimentByStudentId(student.id);
        let abono = await getAbono(student.tutor_id);

        let studentData = {
            ...student,
            ...tutor,
            ...parents,
            ...address,
            ...contact,
            ...medical,
            ...payment,
            ...abono
        }
        studentConflicts.push(studentData);
    }
    return studentConflicts;
}




module.exports = {
    insertStudent,
    getStudentByCode,
    getStudentByCi,
    updateStudentByCi,
    updateStudentByCode,
    updateStudentById,
    getStudentIdByCi,
    getStudentParentsIdAndTutorIdByCi,
    getStudentList,
    searchConflicts
};
