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

module.exports ={insertInscriptionPayment};