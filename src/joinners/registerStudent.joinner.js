const sequelize = require("../SQL/Sequelize/connection");
const {createRegister, getRegister} = require("../controllers/register.controller");

async function registerStudent(req, res) {
    let data = req.body;
    let {register_code, user, description, date, type, insertion_query, rollback_query} = data; 
    
    if(register_code == null || register_code == undefined ||
        user == null || user == undefined ||
        description == null || description == undefined ||
        date == null || date == undefined ||
        type == null || type == undefined || 
        insertion_query == null || insertion_query == undefined ||
        rollback_query == null || rollback_query == undefined){

            res.status(400).json({ERROR :'Los datos de la solicitud son incorrectos o no están completos'});
            return
        } 


    const insertTrasaction = await sequelize.transaction();

    try {
        await createRegister(data);
        let register = await getRegister(register_code);
        sequelize.query(register.insertion_query);
        insertTrasaction.commit();
        res.status(200).json(data);
    } catch (error) {
        insertTrasaction.rollback();
        res.status(500).json({ERROR : "No se ha podido registrar al estudiante"});
    }

}

module.exports = registerStudent;