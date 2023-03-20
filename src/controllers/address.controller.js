const Address = require("../SQL/models/address.model");
const sequelize = require("../SQL/Sequelize/connection");

async function insertAddress({birthCountry, birthEstado, birthMunicipio, birthParroquia, liveEstate, liveMunicipio, liveParroquia, address, procedence }, student_id, transaction){

    let insert = await Address.create({
        student_id,
        birth_country: birthCountry,
        birth_state: birthEstado,
        birth_municipio: birthMunicipio,
        birth_parroquia: birthParroquia,
        live_state: liveEstate,
        live_municipio: liveMunicipio,
        live_parroquia: liveParroquia,
        address,
        procedence_school: procedence
        

    },{
        transaction
    });

    return insert.dataValues.id;
}
//

async function getAddressByStudentId(student_id, transaction){

    let ask = await Address.findAll({
        attributes: { include: [[sequelize.col('updatedAt'), 'addressDate']] },
        where:{
            student_id
        },
        transaction
    });

    if(ask.length > 0){
        return ask[0].dataValues;
    }

    return null;
}

//
async function updateAddressByStudentId({birthCountry, birthEstado, birthMunicipio, birthParroquia, liveEstate, liveMunicipio, liveParroquia, address, procedence }, student_id, transaction){

    let update = await Address.update({
        birth_country: birthCountry,
        birth_state: birthEstado,
        birth_municipio: birthMunicipio,
        birth_parroquia: birthParroquia,
        live_state: liveEstate,
        live_municipio: liveMunicipio,
        live_parroquia: liveParroquia,
        address,
        procedence_school: procedence
        

    },{
        where:{
            student_id
        },
        transaction
    });

    return update;
}


module.exports = { insertAddress, getAddressByStudentId, updateAddressByStudentId}