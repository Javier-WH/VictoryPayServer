const sequelize = require("../SQL/Sequelize/connection");
const {addNewRegister, getRegisterByid} = require("../controllers/register.controller");
const getCode = require("../helpers/getCode");

async function resolveSyncConflict(registerID, option){
  

    let register = await getRegisterByid(registerID);

    if(register < 0){

       res.status(200).json({
            ERROR: "El registro no existe"
       });
        return;
    }

    let code = getCode(20);

    let insertionObject = {
        insertQuery: register.rollbackQuery,
        rollbackQuery: register.insertQuery,
        user: register.user, 
        code,
        pivot: register.pivot,
        type: 3
    }

    let query = option == "A" ? register.insertQuery : register.rollbackQuery;
  
    await sequelize.query(query);
    await addNewRegister(insertionObject);

}

module.exports = resolveSyncConflict;