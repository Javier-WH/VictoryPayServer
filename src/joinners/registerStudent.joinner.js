
const sequelize = require("../SQL/Sequelize/connection");
const { getStudentByCi, getStudentByCode, insertStudent, updateStudentByCi, updateStudentByCode, updateStudentById } = require("../controllers/student.controller");
const { insertParents, getParentsByCi, deleteParentsById } = require("../controllers/parents.controller");
const { getTutorByCi, insertTutor } = require("../controllers/tutors.controller");
const { getAddressByStudentId, insertAddress } = require("../controllers/address.controller");
const { insertMedicalInfo } = require("../controllers/medicalInfo.controller");
const { insertContactInfo } = require("../controllers/contact_info.controller");
const { insertInscriptionPayment } = require("../controllers/inscription_payment.controller");
const { saveInscriptionConflict } = require("../controllers/conflict.controller");
const { getJsonResponse } = require("../helpers/translateConflict");


async function registerStudent(req, res) {
    let data = req.body;
    let registerTransaction = await sequelize.transaction();

    try {
        if(data.force != undefined){
            console.log(data.force)
            return;
        }


        //se revisa que la cédula no esté registrada
        let student = await getStudentByCi(data.studentCi);
        if (student != null) {
            let conflicData = await saveInscriptionConflict(data, student);
            let conflict = await getJsonResponse(conflicData);
            conflict.CONFLICT = "1";
            res.status(200).json(conflict);
            return
        }



        //revisa que los padres no estén registrados para no registralos dos veces
        let parents = await getParentsByCi(data, registerTransaction);
        let parents_id = 0;
        if (parents != null) {
            parents_id = parents.id;
        } else {
            parents_id = await insertParents(data, registerTransaction);
        }


        //revisa que el tutor no esté registrado para no registrarlo dos veces
        let tutor = await getTutorByCi(data, registerTransaction);
        let tutor_id = 0;
        if (tutor != null) {
            tutor_id = tutor.id;
        } else {
            tutor_id = await insertTutor(data, registerTransaction);
        }

        let student_id = await insertStudent(data, parents_id, tutor_id, registerTransaction);
        await insertAddress(data, student_id, registerTransaction);
        await insertMedicalInfo(data, student_id, registerTransaction);
        await insertContactInfo(data, student_id, registerTransaction);
        await insertInscriptionPayment(data, student_id, registerTransaction);
        await registerTransaction.commit();
        res.status(200).json(data);
    } catch (error) {
        await registerTransaction.rollback();
        console.log(error);
        //res.status(400).json({ ERROR: "ocurrio un error" });
    }

}

module.exports = registerStudent;