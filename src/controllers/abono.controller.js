const Abono = require("../SQL/models/abono.model");
const sequelize = require("../SQL/Sequelize/connection")

async function getAbono(tutor_code){

    let tutorRegister = await Abono.findOne({
        where:{
            tutor_code
        },
        raw: true
    });

    if(tutorRegister == null){
        return 0;
    }

    return tutorRegister.abono;
}

///

async function abonoRegisterExist(tutor_code){

    let tutorRegister = await Abono.findOne({
        where:{
            tutor_code
        },
        raw: true
    });

    return tutorRegister;

}


///

async function getAbonosListPage(updatedAT = "01/01/1998 01:01:01", page = 1){
    const pageSize = 50;
    const totalRecords = await Abono.count();

    const totalPages = Math.ceil(totalRecords / pageSize); 
    const actualPage = (page - 1) * 50;


    const query = `SELECT * FROM abonos WHERE STR_TO_DATE(abonos.updatedAT,'%m/%d/%Y %H:%i:%s') >= STR_TO_DATE('${updatedAT}','%m/%d/%Y %H:%i:%s') ` +
    `LIMIT 50 OFFSET ${actualPage};`;

    const abonosList = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

   
    
    const pageData = abonosList.map(register =>{
        
        let insertion_query = `REPLACE INTO abonos (tutor_code, abono, updatedAT) VALUES ('${register.tutor_code}', '${register.abono}', '${register,updatedAT}')`
            
        
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


module.exports = {getAbono, getAbonosListPage, abonoRegisterExist}