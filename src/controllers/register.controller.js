const Register = require("../SQL/models/registers.model");


async function createRegister({register_code, user, description, date, type, insertion_query, rollback_query}){
   
    let create = await Register.create({ 
        register_code, 
        user, 
        description, 
        date, 
        type, 
        insertion_query, 
        rollback_query
    },{
        raw: true
    });

    return create.id;
}
/////

async function getRegister(register_code){

    let register = await Register.findOne({
        where:{
            register_code
        },
        raw: true
    });

    return register;
}


module.exports = {createRegister, getRegister};