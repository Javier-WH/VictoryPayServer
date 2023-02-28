const Parents = require("../SQL/models/parents.model");

async function insertParents({ motherName, motherCi, motherNationality, motherWork, fatherName, fatherCi, fatherNationality, fatherWork }, transaction) {


    let insert = await Parents.create({
        mother_name: motherName,
        mother_ci: motherCi,
        mother_nation: motherNationality,
        mother_work: motherWork,
        father_name: fatherName,
        father_ci: fatherCi,
        father_nation: fatherNationality,
        father_work: fatherWork
    }, {
        transaction
    });
    return insert.dataValues.id;


}
//

async function updateParents({ motherName, motherCi, motherNationality, motherWork, fatherName, fatherCi, fatherNationality, fatherWork }, id, transaction) {


    let update = await Parents.update({
        mother_name: motherName,
        mother_ci: motherCi,
        mother_nation: motherNationality,
        mother_work: motherWork,
        father_name: fatherName,
        father_ci: fatherCi,
        father_nation: fatherNationality,
        father_work: fatherWork
    }, {
        where:{
           id
        },
        transaction
    });
    return update;
}

//


async function getParentsByCi({ motherCi, fatherCi }, transaction) {


    let ask = await Parents.findAll({
        where: {
            mother_ci: motherCi,
            father_ci: fatherCi,
        },
        transaction
    });

    if (ask.length > 0) {
        return ask[0]
    }

    return null;

}

async function deleteParentsById(id, transaction) {

    Parents.destroy({
        where: {
            id
        },
        transaction
    });
}

async function getParentById(id, transaction){

    let ask = await Parents.findAll({
        where:{
            id
        }
    },{
        transaction
    })

    if(ask.length > 0){
        return ask[0].dataValues;
    }

    return null;

}

module.exports = { insertParents, getParentsByCi, deleteParentsById, getParentById, updateParents }









/**
 * 
 *   date: '8 / 1 / 2021', 
                fatherName: 'Antonio Jose de Suicre',    
                hipertension: 'false',
                motherCi: '123',      
                fatherWork: '123',
                phone2: '123',
                phone1: '123',
                procedence: '123',
                tutorSelected: '1',
                payMethod: '2',
                birthParroquia: 'Altagracia de Orituco',
                birthCountry: 'Venezuela',
                w1: 'false',
                birthMunicipio: 'Monagas',
                tutorNationality: 'V-',
                w2: 'false',
                motherNationality: 'V-',
                liveMunicipio: 'Monagas',
                motherName: '123',
                studentNation: 'V-',
                daltonismo: 'false',
                tutorCi: '123',
                fatherCi: '1231',
                mount: '123',
                liveEstate: 'Guárico',
                TDAH: 'false',
                studentName: 'Simon Jose Antonio de la Santisima Trinidad',
                grade: '1er año',
                motherWork: '13',
                observations1_4: '',
                code: 'I1-2965673308',
                gender: 'Masculino',
                liveParroquia: 'Altagracia de Orituco',
                link3: 'Es la Madre',
                email: '123',
                studentLastName: 'Bolivar y Palacios, Ponte y Blanco',
                address: '123',
                spinerIndex: '0XXX10XXX7XXX0XXX10XXX7XXX0',
                studentCi: '888899',
                whatsaap1: 'No suministrado',
                dislexia: 'false',
                asma: 'false',
                alergia: 'false',
                whatsaap2: 'No suministrado',
                birthDate: '20 / 1 / 2004',
                seccion: '-',
                tutorName: '123',
                epilepsia: 'false',
                fatherNationality: 'V-',
                birthEstado: 'Guárico',
                diabetes: 'false',
                age: '18 años',
                account: '123'
 */