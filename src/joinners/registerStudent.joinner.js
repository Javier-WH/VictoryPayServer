
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
    
}

module.exports = registerStudent;