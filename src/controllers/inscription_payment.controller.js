const Inscription_payment = require("../SQL/models/inscription_payment.model");

async function insertInscriptionPayment({mount, payMethod, account, date}, student_id, transaction){

    let insert = await Inscription_payment.create({
        student_id,
        inscription: mount,
        cash : payMethod == 1 ? "false" : "true",
        operation_number: account,
        date
    },{
        transaction
    });

    return insert.dataValues.id;
}

async function getInscriptionPaimentByStudentId(student_id, transaction){

    let ask = await Inscription_payment.findAll({
        where:{
            student_id
        },
        transaction
    });

    if(ask.length > 0){
        return ask[0].dataValues
    }
    return null;
}


async function updateInscriptionPayment({mount, payMethod, account, date}, student_id, transaction){

    let update = await Inscription_payment.update({
      
        inscription: mount,
        cash : payMethod == 1 ? "false" : "true",
        operation_number: account,
        date
    },{
        where:{
            student_id,
        },
        transaction
    });

    return update;
}



module.exports ={insertInscriptionPayment, getInscriptionPaimentByStudentId, updateInscriptionPayment};