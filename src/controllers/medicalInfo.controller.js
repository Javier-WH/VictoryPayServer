const Medical_info = require("../SQL/models/medical_info.model");

async function insertMedicalInfo({diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergia, TDAH, observations1_4 }, student_id, transaction){

    let insert = await Medical_info.create({
        student_id,
        diabetes,
        hipertension,
        dislexia,
        daltonismo,
        epilepsia,
        asma,
        alergias: alergia,
        TDAH,
        observations: observations1_4
        
    },{
        transaction
    });

    return insert.dataValues.id;
}

async function getMedicalInfoByStudentId( student_id, transaction){

    let ask = await Medical_info.findAll({
        where:{
            student_id
        },
        transaction
    });

    if(ask.length >0){

        return ask[0].dataValues
    }
    return null
}


module.exports = {insertMedicalInfo, getMedicalInfoByStudentId};