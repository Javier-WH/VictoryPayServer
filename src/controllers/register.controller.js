const Register = require("../SQL/models/registers.model");
const sequelize = require("../SQL/Sequelize/connection");


async function addNewRegister({ insertQuery, rollbackQuery, user, code, pivot, type}){
    let insert = await Register.create({
        code,
        user,
        pivot,
        insertQuery,
        rollbackQuery,
        type
    });
    return insert.id;
};

async function getRegisterByid(id){

    let ask = await Register.findOne({
        where:{
            id
        }
    });

    return ask.dataValues;

}


async function getRegisterByCode(code){

    let ask = await Register.findOne({
        where:{
            code
        }
    });

    return ask.dataValues;

}


module.exports ={addNewRegister, getRegisterByid, getRegisterByCode}

