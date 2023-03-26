const Register = require("../SQL/models/registers.model");


async function createRegister({register_code, user, description, date, type, metadata, insertion_query, rollback_query}, transaction){
   
    let create = await Register.create({ 
        register_code, 
        user, 
        description, 
        date, 
        type,
        metadata, 
        insertion_query, 
        rollback_query
    },{
        transaction:transaction,
        raw: true
    });

    return create.id;
}
/////

async function getRegister(register_code, transaction){

    let register = await Register.findOne({
        where:{
            register_code
        },
        raw: true,
        transaction
    });

    return register;
}

//
async function isRecordExisting(register_code){
    const count = await Register.count({ 
        where: { 
            register_code 
        } 
    });


    if( count > 0){
        return true;
    }

    return false;
}

module.exports = {createRegister, getRegister, isRecordExisting};