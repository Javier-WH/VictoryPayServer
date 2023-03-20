const { getStudentList, searchConflicts } = require("../controllers/student.controller");
const {createStudentSyncQuery} = require("../SQL/queryMaker/syncQuery.queryMaker");
const {addNewRegister}  = require("../controllers/register.controller");

const sequelize = require("../SQL/Sequelize/connection");


async function SyncStudents(req, res) {
    //los alumnos enviados
    let commingData = req.body.datos;
    let user = req.body.user;

    //si no envia los datos
    if (commingData == undefined) {
        res.status(400).json({ ERROR: "dastos desconocidos" });
        return;
    }

    await searchConflicts(commingData);

    let queries = await createStudentSyncQuery(commingData, user);

    await addNewRegister(queries);

    await sequelize.query(queries.insertQuery);

    let studentList = await getStudentList();
  
    res.status(200).json({data : studentList});

    return;
    /*
    //obtiene los alumnos almacenados en el servidor
    let storedData = await getStudentList();

    //une en una lista los alumnos enviados con los almacenados en el servidor
    let condensedData = storedData.concat(commingData);

    //obtiene los códigos repetidos
    let duplicateCodes = [];
    condensedData.forEach((student1, index1) => {
        let matches = 0;
        let code1 = student1.code;

        condensedData.forEach((student2, index2) => {
            let code2 = student2.code;
            if (code1 == code2) {
                matches++;
                if (matches == 2 && index1 != index2) {
                    duplicateCodes.push({
                        index1,
                        index2
                    });
                }
            }
        });
    });


 
    //elimina los codigos repetidos en base a la fecha de almacenado.
    let removedItems = [];
    duplicateCodes.forEach(duplicate => {
        let { index1, index2 } = duplicate;
        let student1 = condensedData[index1];
        let student2 = condensedData[index2];
        let date1 = new Date(student1.updatedAt);
        let date2 = new Date(student2.updatedAt);
        
     
        if(date1.getTime() == date2.getTime()){ // si las fechas son iguales, solo deja uno
            removedItems.push(condensedData[index2]);
            delete condensedData[index2];
            //removedItems = condensedData.splice(index2, index2);
        }
        else if (date1.getTime() > date2.getTime()) { // si la fecha del primero es mayor, elimina al segundo
            removedItems.push(condensedData[index2]);
            delete condensedData[index2];
            //removedItems = condensedData.splice(index2, index2);
        } else { // de lo contrario elimina al primero
            removedItems.push(condensedData[index1]);
            delete condensedData[index1];
            //removedItems = condensedData.splice(index1, index1);
        }
    });

    let filteredData = condensedData.filter(student => student != undefined || student != null);


    let syncQueries = createStudentSyncQuery(filteredData, removedItems);

    await addNewRegister(syncQueries);
    await sequelize.query(syncQueries.insertQuery);

    let studentList = await getStudentList();
  
    res.status(200).json({data : studentList});
*/
}

module.exports = SyncStudents;

//mes/dia/year

/* 
[
  {
    tutor_nation: 'V-',
    date: 'Selecciona una fecha',      
    birthdate: '21 / 1 / 2004',        
    nation: 'V-',
    contactDate: '2023-03-15 14:34:16',
    hipertension: 'false',
    mother_name: '23432',
    mother_work: '243243',
    live_parroquia: 'Altagracia de Orituco',
    phone2: '234324',
    tutor_ci: '3243243',
    tutorDate: '2023-03-15 14:34:16',
    father_ci: '234324',
    birth_country: 'Venezuela',
    phone1: '324324',
    tutor_name: '23432',
    inscription: '100.0',
    whatsapp2: 'false',
    id: '2',
    cash: 'true',
    live_municipio: 'Monagas',
    addressDate: '2023-03-15 14:34:16',
    whatsapp1: 'false',
    daltonismo: 'false',
    live_state: 'Guárico',
    father_work: '324324',
    birth_municipio: 'Monagas',
    TDAH: 'false',
    father_name: '2432',
    parent_id: '2',
    grade: '1er año',
    mother_ci: '3243243',
    name: '43242',
    tutor_link: 'Es la Madre',
    status: 'true',
    birth_parroquia: 'Altagracia de Orituco',
    lastName: '324324',
    tutor_id: '2',
    code: 'N1-427072961',
    gender: 'Masculino',
    birth_state: 'Guárico',
    medicalDate: '2023-03-15 14:34:16',
    parentsDate: '2023-03-15 14:34:16',
    observations: '',
    email: '234234',
    address: '324324',
    ci: '324324324',
    dislexia: 'false',
    asma: 'false',
    alergias: 'false',
    seccion: '-',
    epilepsia: 'false',
    father_nation: 'V-',
    mother_nation: 'V-',
    operation_number: '',
    paymentDate: '2023-03-15 14:34:16',
    diabetes: 'false',
    age: '18 años',
    updatedAT: '2023-03-15 14:34:16',
    procedence_school: '324324'
  }
]



    let date1 = new Date("01/02/2022");
    let date2 = new Date("01/01/2022");

    if (date1.getTime() > date2.getTime()) {
        console.log("date1 es mayor");
    } else {
        console.log("date2 es mayor");
    }

*/