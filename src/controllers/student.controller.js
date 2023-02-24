const Student = require("../SQL/models/students.model");

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

async function getStudentByCi(ci, transaction) {


    let ask = await Student.findAll({
        where: {
            ci
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

async function updateStudentByCi({ code, studentName, studentLastName, studentCi, studentNation, seccion, grade, gender, birthDate, age }, transaction) {


    let update = await Student.update({
        name: studentName,
        lastName: studentLastName,
        nation: studentNation,
        seccion: seccion,
        grade: grade,
        gender: gender,
        code: code,
        age: age,
        birthDate: birthDate
    }, {
        where: {
            ci: studentCi
        },
        transaction
    });

    return insert.dataValues.id;


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


module.exports = { insertStudent, getStudentByCode, getStudentByCi, updateStudentByCi, updateStudentByCode };
