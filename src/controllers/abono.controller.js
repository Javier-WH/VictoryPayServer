const Abono = require("../SQL/models/abono.model");


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

async function getAbonosList(){

    let list = await Abono.findAll({raw:true});

    return list;

}


module.exports = {getAbono, getAbonosList}