const sequelize = require("../SQL/Sequelize/connection");
const {addNewRegister, getRegisterByid} = require("../controllers/register.controller");
const getCode = require("../helpers/getCode");

async function resolveInsertion(req, res){
  
    let {registerID, option} = req.body;

    let register = await getRegisterByid(registerID);
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

    res.status(200).json({
        code
    });   

}

module.exports = resolveInsertion;