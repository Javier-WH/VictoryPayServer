const Tutor = require("../SQL/models/tutors.model");


async function insertTutor({tutorName, tutorCi, tutorNationality, link3}, transaction){

    let insert = await Tutor.create({
        tutor_name: tutorName,
        tutor_ci: tutorCi,
        tutor_nation: tutorNationality,
        tutor_link: link3
    },{
        transaction
    });

    return insert.dataValues.id;

}

async function updateTutor({tutorName, tutorCi, tutorNationality, link3}, id, transaction){

    let update = await Tutor.update({
        tutor_name: tutorName,
        tutor_ci: tutorCi,
        tutor_nation: tutorNationality,
        tutor_link: link3
    },{
        where:{id},
        transaction
    });

    return update;

}

async function getTutorByCi({tutorCi}, transaction){

    let ask = await Tutor.findAll({
        where:{
            tutor_ci: tutorCi
        },
        transaction
    });

    if(ask.length > 0){
        return ask[0];
    }

    return null;
}

async function getTutorById(id, transaction){

    let ask = await Tutor.findAll({
        where:{
           id
        },
        transaction
    });

    if(ask.length > 0){
        return ask[0].dataValues;
    }

    return null;
}


module.exports = {insertTutor, getTutorByCi, getTutorById, updateTutor}
