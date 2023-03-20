const Contact_info = require("../SQL/models/contact_info.model");
const sequelize = require("../SQL/Sequelize/connection");

async function insertContactInfo({phone1, phone2, email, whatsaap1, whatsaap2}, student_id, transaction){

    let insert = await Contact_info.create({
        student_id,
        phone1,
        phone2,
        email,
        whatsaap1,
        whatsaap2
    },{
        transaction
    });

    return insert.dataValues.id;

}

async function getContactInfoByStudentId(student_id, transaction){

    let ask = await Contact_info.findAll({
        attributes: { include: [[sequelize.col('updatedAt'), 'contactDate']] },
        where:{
            student_id
        },
        transaction
    });

    if(ask.length > 0){
        return ask[0].dataValues;
    }
    return null;

}

async function updateContactInfo({phone1, phone2, email, whatsaap1, whatsaap2}, student_id, transaction){

    let update = await Contact_info.update({
        phone1,
        phone2,
        email,
        whatsaap1,
        whatsaap2
    },{
        where:{
            student_id
        },
        transaction
    });

    return update;

}


module.exports ={ insertContactInfo, getContactInfoByStudentId, updateContactInfo};