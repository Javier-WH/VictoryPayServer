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


module.exports = {insertMedicalInfo};