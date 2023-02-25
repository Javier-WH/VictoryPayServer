const { updateStudentByCi, getStudentByCi} = require("../controllers/student.controller");
const { getConflictItem } = require("../controllers/conflict.controller");
const {updateAddressByStudentId} = require("../controllers/address.controller");
const {getParentsByCi, insertParents} = require("../controllers/parents.controller");
const {getTutorByCi, insertTutor} = require("../controllers/tutors.controller");
const {updateMedicalInfoByStudentId} = require("../controllers/medicalInfo.controller");
const{updateContactInfo} = require("../controllers/contact_info.controller");
const {updateInscriptionPayment} = require('../controllers/inscription_payment.controller');


async function forceInsert(id, transaction) {
    let hasConflict = await getConflictItem(id, transaction);
    // revisa si existe un registro de conflicto 
    if (hasConflict != null) {
        let conflictData = hasConflict.data;//dato del estudiante 

        try {

            //revisa que los padres no estén registrados para no registralos dos veces
            let parents = await getParentsByCi(conflictData, transaction);
            let parents_id = 0;
            if (parents != null) {
                parents_id = parents.id;
            } else {
                parents_id = await insertParents(conflictData, transaction);
            }


            //revisa que el tutor no esté registrado para no registrarlo dos veces
            let tutor = await getTutorByCi(conflictData, transaction);
            let tutor_id = 0;
            if (tutor != null) {
                tutor_id = tutor.id;
            } else {
                tutor_id = await insertTutor(conflictData, transaction);
            }

            //actualiza al estudiante y obbtiene su id;
            await updateStudentByCi(conflictData, parents_id, tutor_id, transaction)
            let studen = await getStudentByCi(conflictData.studentCi);
            let student_id = studen.id;

            await updateAddressByStudentId(conflictData, student_id, transaction);
            await updateMedicalInfoByStudentId(conflictData, student_id, transaction);
            await updateContactInfo(conflictData, student_id, transaction);
            await updateInscriptionPayment(conflictData, student_id, transaction);
            await transaction.commit();
           
            return conflictData;
        } catch (error) {
            console.log(error)
            await transaction.rollback();
            return null;
        }
    }

}

module.exports = forceInsert;