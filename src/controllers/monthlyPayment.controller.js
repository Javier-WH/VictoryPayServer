const Monthly_payment = require("../SQL/models/monthly_payment.model");
const sequelize = require("../SQL/Sequelize/connection");


async function getMontlyPaymentsInfo(student_code){

    const info = await Monthly_payment.findOne({
        where:{
            student_code
        },
        raw: true
    });
    
    return info;
}

///


async function getMonthlyPaymentListPage(updatedAT = "01/01/1998 01:01:01", page = 1){
    const pageSize = 50;
    const totalRecords = await Monthly_payment.count();

    const totalPages = Math.ceil(totalRecords / pageSize); 
    const actualPage = (page - 1) * 50;


    const query = `SELECT * FROM monthly_payments WHERE STR_TO_DATE(monthly_payments.updatedAT,'%m/%d/%Y %H:%i:%s') >= STR_TO_DATE('${updatedAT}','%m/%d/%Y %H:%i:%s') ` +
    `LIMIT 50 OFFSET ${actualPage};`;

    const abonosList = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

 
    const pageData = abonosList.map(register =>{
        let insertion_query = `REPLACE INTO monthly_payments (student_code, last_payment, updatedAT) VALUES ('${register.student_code}', '${register.last_payment}', '${register.updatedAT}')`     
        return {insertion_query};
    })

  
    return  {
        date: updatedAT,
        pageSize,
        totalRecords,
        totalPages, 
        page,
        pageData
    }

}

module.exports = {getMontlyPaymentsInfo, getMonthlyPaymentListPage}