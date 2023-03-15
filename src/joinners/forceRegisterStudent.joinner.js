const { updateStudentByCi, getStudentIdByCi} = require("../controllers/student.controller");
const { getConflictItem } = require("../controllers/conflict.controller");
const { updateAddressByStudentId } = require("../controllers/address.controller");
const { getParentsByCi, insertParents, updateParents } = require("../controllers/parents.controller");
const { getTutorByCi, insertTutor, updateTutor } = require("../controllers/tutors.controller");
const { updateMedicalInfoByStudentId } = require("../controllers/medicalInfo.controller");
const { updateContactInfo } = require("../controllers/contact_info.controller");
const { updateInscriptionPayment } = require('../controllers/inscription_payment.controller');


async function forceInsert(id, transaction) {
    let hasConflict = await getConflictItem(id, transaction);
    // revisa si existe un registro de conflicto 
    if (hasConflict != null) {
        let conflictData = hasConflict.data;//dato del estudiante 

        try {

            //revisa si existen los padres
            let parentId = null
            let parentsRegistered = await getParentsByCi(conflictData, transaction);
            if(parentsRegistered != null){
                parentId = parentsRegistered.dataValues.id;
                await updateParents(conflictData, parentId, transaction);
            }else{
                parentId = await insertParents(conflictData, transaction);
            }

            //revisa si existe el tutor
            let tutorId = null;
            let tutorRegistered = await getTutorByCi(conflictData, transaction);
            if(tutorRegistered != null){
                tutorId = tutorRegistered.dataValues.id;
                await updateTutor(conflictData, tutorId, transaction);
            }else{
                tutorId = await insertTutor(conflictData, transaction);
            }



            //actualiza al estudiante y obbtiene su id;
            await updateStudentByCi(conflictData, parentId, tutorId, transaction);
            let student_id = await getStudentIdByCi(conflictData.studentCi);


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