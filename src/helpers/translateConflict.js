function getJsonResponse(userA, userB){

  
    let response = {
        name1: `${userA.studentName} ${userA.studentLastName}`,
        ci1: userA.studentCi,
        code1: userA.code,
        sec1: userA.seccion,
        grade1: userA.grade,
        gender1: userB.gender,

        name2: `${userB.name} ${userB.lastName}`,
        ci2: userB.ci,
        code2: userB.code,
        sec2: userB.seccion,
        grade2: userB.grade,
        gender2: userB.gender,
    };



    return response;
}



module.exports = {getJsonResponse};

/**
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