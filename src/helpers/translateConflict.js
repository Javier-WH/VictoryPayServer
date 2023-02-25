const {getConflictItem} = require("../controllers/conflict.controller");

async function getJsonResponse({idA, idB}){

    let studentA = await getConflictItem(idA);
    let studentB = await getConflictItem(idB);


    let response = {
        name1: `${studentA.data.studentName} ${studentA.data.studentLastName}`,
        ci1: studentA.data.studentCi,
        code1: studentA.data.code,
        sec1: studentA.data.seccion,
        grade1: studentA.data.grade,
        gender1: studentA.data.gender,
        id1: studentA.id,

        name2: `${studentB.data.studentName} ${studentB.data.studentLastName}`,
        ci2: studentB.data.studentCi,
        code2: studentB.data.code,
        sec2: studentB.data.seccion,
        grade2: studentB.data.grade,
        gender2: studentB.data.gender,
        id2: studentB.id,

        link: studentA.link,
        type: studentA.type
    };

    return response;
}


module.exports = {getJsonResponse};

