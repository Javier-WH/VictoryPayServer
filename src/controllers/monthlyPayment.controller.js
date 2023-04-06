const Monthly_payment = require("../SQL/models/monthly_payment.model")


async function getMontlyPaymentsInfo(student_code){

    const info = await Monthly_payment.findOne({
        where:{
            student_code
        },
        raw: true
    });
    
    return info;
}


module.exports = {getMontlyPaymentsInfo}