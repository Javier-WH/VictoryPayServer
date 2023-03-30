const Register = require("../SQL/models/registers.model");

const sequelize = require("../SQL/Sequelize/connection");

async function createRegister({ register_code, user, description, date, type, metadata, insertion_query, rollback_query, updatedAT }, transaction) {

    let create = await Register.create({
        register_code,
        user,
        description,
        date,
        type,
        metadata,
        insertion_query,
        rollback_query,
        ...(updatedAT ? { updatedAT } : {}) // incluir updatedAT solo si se proporciona
    }, {
        transaction: transaction,
        raw: true
    });

    return create.id;
}
/////

async function getRegister(register_code, transaction) {

    let register = await Register.findOne({
        where: {
            register_code
        },
        raw: true,
        transaction
    });

    return register;
}

//
async function isRecordExisting(register_code) {
    const count = await Register.count({
        where: {
            register_code
        }
    });


    if (count > 0) {
        return true;
    }

    return false;
}


async function getRecordList(updatedAT = "01/01/1998 01:01:01") {
    let query = `SELECT * FROM registers WHERE STR_TO_DATE(updatedAT,'%m/%d/%Y %H:%i:%s') >= STR_TO_DATE('${updatedAT}','%m/%d/%Y %H:%i:%s')`;
    let list = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return list;
}

async function getRecordPage (updatedAT = "01/01/1998 01:01:01", page = 1){
    const pageSize = 50;
    const totalRecords = await Register.count();
    const totalPages = Math.ceil(totalRecords / pageSize); 
    const actualPage = (page - 1) * 50


    const query = `SELECT * FROM registers WHERE STR_TO_DATE(updatedAT,'%m/%d/%Y %H:%i:%s') >= STR_TO_DATE('${updatedAT}','%m/%d/%Y %H:%i:%s') LIMIT 50 OFFSET ${actualPage}`;
    const pageData = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  
    return {
        date: updatedAT,
        pageSize,
        totalRecords,
        totalPages, 
        page,
        pageData
    }

}


module.exports = { createRegister, getRegister, isRecordExisting, getRecordList, getRecordPage };