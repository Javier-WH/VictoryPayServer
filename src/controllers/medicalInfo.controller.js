const Medical_info = require("../SQL/models/medical_info.model");
const sequelize = require("../SQL/Sequelize/connection");

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
        attributes: { include: [[sequelize.col('updatedAt'), 'medicalDate']] },
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

async function updateMedicalInfoByStudentId({diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergia, TDAH, observations1_4 }, student_id, transaction){

    let update = await Medical_info.update({
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
        where:{
            student_id
        },
        transaction
    });

    return update;
}


module.exports = {insertMedicalInfo, getMedicalInfoByStudentId, updateMedicalInfoByStudentId};