
const sequelize = require("../SQL/Sequelize/connection");
const { getStudentByCi, insertStudent} = require("../controllers/student.controller");
const { insertParents, getParentsByCi } = require("../controllers/parents.controller");
const { getTutorByCi, insertTutor } = require("../controllers/tutors.controller");
const { insertAddress } = require("../controllers/address.controller");
const { insertMedicalInfo } = require("../controllers/medicalInfo.controller");
const { insertContactInfo } = require("../controllers/contact_info.controller");
const { insertInscriptionPayment } = require("../controllers/inscription_payment.controller");
const { saveInscriptionConflict } = require("../controllers/conflict.controller");
const { getJsonResponse } = require("../helpers/translateConflict");
const forceInsert = require("./forceRegisterStudent.joinner");

const createInsertionQuery = require("../SQL/queryMaker/InsertionQuery.queryMaker");
const {addNewRegister, getRegisterByid} = require("../controllers/register.controller");
const normlaiceInfo = require("../helpers/normaliceInfo");
const getCode = require("../helpers/getCode");

async function registerStudent(req, res) {
    let data = req.body;

    //crea las queries para seer almacenados
    let queries = createInsertionQuery(data);

    //revisa que la cedula no esté inscrita
    let student = await getStudentByCi(data.studentCi);

    //si el estudiante esta registrado entonces hace un registro de tipo 2, es decir de conflicto
    if (student != null) {
        //normaliza los datos del estudiante registrado
        let registeredData = normlaiceInfo(student);
        //agrega los datos faltantes como el usuario y la fecha
        registeredData.user = data.user;
        registeredData.timeStamp = data.timeStamp;
        
        //crea la querie adicional para el estudiante ya registrado
        let queriesB = createInsertionQuery(registeredData);
        
        //genera el código del registro de conflicto
        let code = getCode(20);

        //crea los argumentos del registro 
        let insertionObject = {
            insertQuery: queries.insertQuery,
            rollbackQuery: queriesB.insertQuery,
            user: data.user, 
            code,
            pivot: data.studentCi,
            type: 2
        }

        //inserta el registro de conflicto
        let insertionID = await addNewRegister(insertionObject);
        
        //envia la solicitud de resolución de conflicto
        res.status(200).json({
            ERROR: "2",
            title: "Conflicto de cédulas",
            message: "La cédula suministrada ya está registrada",
            registerID: insertionID,
            code,
            optionA: data,
            optionB: registeredData
        });
        return
    }

    //inserta los queriues en la tabla
    let insertionID = await addNewRegister(queries);

    //obtiene el registro de la tabla **** este paso se puede mejorar pasando el query generado directamente "queries.insertQuery"
    let register = await getRegisterByid(insertionID);

    //sequelize.query(register.insertQuery);
    sequelize.query(register.insertQuery);


    res.status(200).json(data);

    return;
    let registerTransaction = await sequelize.transaction();

    try {
        //esto revisa que no se esté obligando a una acutalización
        if(data.force != undefined){
            let forceId = data.force;
            let forcedData = await forceInsert(forceId, registerTransaction);
            res.status(200).json(forcedData);
            return;
        }


        //se revisa que la cédula no esté registrada, de estarlo envía un conficto
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