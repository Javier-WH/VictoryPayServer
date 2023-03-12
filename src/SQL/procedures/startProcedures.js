const startGetParentIDProcedure = require("./getParentId.procedure");
const startGetTutorIDProcedure = require("./getTutorId.procedure");
const startGetStudentIDProcedure = require("./getStudentId.procedure");
const startInsertAddress = require("./insertAddress.procedure");
const startInsertContactInfo = require("./insertContactInfo.procedure");
const startInsertMedicalInfo = require("./insertMedicalInfo.procedure");
const startInsertStudent = require("./insertStudent.procedure");
const startInsertTutor = require("./insertTutor.procedure");
const startInsertParents = require("./insertParents.procedure");
const startInscriptionPayment = require("./insertInscriptionPayment.procedure");

async function starProcedurres(){
    try {
        await startGetParentIDProcedure();
        await startGetTutorIDProcedure();
        await startGetStudentIDProcedure();
        await startInsertAddress();
        await startInsertContactInfo();
        await startInsertMedicalInfo();
        await startInsertStudent();
        await startInsertTutor();
        await startInsertParents();
        await startInscriptionPayment();
        console.log("Procesos iniciados correctamente")
    } catch (error) {
        console.log(error)
    }
 
}

module.exports = starProcedurres;