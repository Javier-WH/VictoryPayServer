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

module.exports = {insertTutor, getTutorByCi}
