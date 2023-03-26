const Joi = require("joi");

async function SyncStudents(req, res) {

    let list = req.body;

    //reviso que los datos enviados sean un array con al menos 1 dato
    const schema = Joi.object({
        students_data: Joi.array().min(1).required()
    }).messages({
        'array.base': 'Los datos enviados no son correctos',
        'array.min': 'No ha suministrado ningun dato'
    });

    const { error, value: data } = schema.validate({ students_data: list });
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
    }

    //reviso que la estructura del array sea consistente

    for (register of list) {

        const schema = Joi.object({
            insertion_query: Joi.string().required(),
            rollback_query: Joi.string().required(),
            metadata: Joi.string().required(),
            register_code: Joi.string().required(),
            description: Joi.string().required(),
            type: Joi.string().required(),
            user: Joi.string().required(),

        }).messages({
            'any.required': 'La estructura de la lista de datos no es correcta'
        });
        const { error, value: data } = schema.validate(register);
        if (error) {
            console.log(error.details[0].message)
            return res.status(400).json({ error: error.details[0].message });
        }

    }

    





    res.send("hola");

    return;

}

module.exports = SyncStudents;

/*
[
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('xxx', 'xxx', '123', 'V-', '-', '1er año', 'Masculino', 'N1-996334174', '20 / 1 / 2004', '18 años', 'P-032623-159572783', 'T-032623-884787269');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-996334174', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123', '123'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-996334174', '123', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-996334174', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '123'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-159572783', '123', '123', 'V-', '123', '123', '123', 'V-', '123'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-884787269', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"xxx","lastname":"xxx","ci":"V-123","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-463528058',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-996334174'; DELETE from addresses WHERE student_code = 'N1-996334174'; DELETE from contact_infos WHERE student_code = 'N1-996334174'; DELETE from medical_infos WHERE student_code = 'N1-996334174';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('xxx', 'xxx', '123', 'V-', '-', '1er año', 'Masculino', 'N1-996334174', '20 / 1 / 2004', '18 años', 'P-032623-233649901', 'T-032623-174652915');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-996334174', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123', '123'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-996334174', '123', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-996334174', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '123'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-233649901', '123', '123', 'V-', '123', '123', '123', 'V-', '123'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-174652915', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"xxx","lastname":"xxx","ci":"V-123","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-745278967',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-996334174'; DELETE from addresses WHERE student_code = 'N1-996334174'; DELETE from contact_infos WHERE student_code = 'N1-996334174'; DELETE from medical_infos WHERE student_code = 'N1-996334174';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('123', '123', '1234', 'V-', '-', '1er año', 'Masculino', 'N1-554819896', '21 / 1 / 2004', '18 años', 'P-032623-870984807', 'T-032623-685022588');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-554819896', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123', '123'); REPLACE INTO contact_infos (student_code, 
phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-554819896', '12321', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-554819896', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '123'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-870984807', '12321', '123213', 'V-', '12321321', '213213213213', '21321', 'V-', '123123'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-685022588', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"123","lastname":"123","ci":"V-1234","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-958729464',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-554819896'; DELETE from addresses WHERE student_code = 'N1-554819896'; DELETE from contact_infos WHERE student_code = 'N1-554819896'; DELETE from medical_infos WHERE student_code = 'N1-554819896';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('aaa', 'aaa', '333', 'V-', '-', '1er año', 'Masculino', 'N1-723691229', '30 / 1 / 2004', '18 años', 'P-032623-695732849', 'T-032623-336069348');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-723691229', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123', '12321'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-723691229', '32132', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-723691229', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '123213'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-695732849', '12312', '123213', 'V-', '12321321', '321', '123213', 'V-', '123213'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-336069348', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"aaa","lastname":"aaa","ci":"V-333","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-354535143',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-723691229'; DELETE from addresses WHERE student_code = 'N1-723691229'; DELETE from contact_infos WHERE student_code = 'N1-723691229'; DELETE from medical_infos WHERE student_code = 'N1-723691229';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('Lola', 'Larsr', '332211', 'V-', '-', '1er año', 'Femenino', 'N1-180535685', '7 / 1 / 2004', '18 años', 'P-032623-578914317', 'T-032623-395503970');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-180535685', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '12321', '213213'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-180535685', '123213', '21321321', '3213', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-180535685', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '12321'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-578914317', '123213', '3213213', 'V-', '2132132', '1321321', '123213', 'V-', '123213'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-395503970', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"Lola","lastname":"Larsr","ci":"V-332211","seccion":"-","gender":"Femenino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-344606103',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-180535685'; DELETE from addresses WHERE student_code = 'N1-180535685'; DELETE from contact_infos WHERE student_code = 'N1-180535685'; DELETE from medical_infos WHERE student_code = 'N1-180535685';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('asd', 'asd', '112312', 'V-', '-', '1er año', 'Masculino', 'N1-770934940', '23 / 1 / 2004', '18 años', 'P-032623-263725814', 'T-032623-251066400');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-770934940', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123123', '21321312'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-770934940', '12321', '21321321', '321', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-770934940', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '123213'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-263725814', '123213', '1232131233123', 'V-', '123213', '123213', '213213', 'V-', '123213'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-251066400', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"asd","lastname":"asd","ci":"V-112312","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-475917691',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-770934940'; DELETE from addresses WHERE student_code = 'N1-770934940'; DELETE from contact_infos WHERE student_code = 'N1-770934940'; DELETE from medical_infos WHERE student_code = 'N1-770934940';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('213213', '213213', '213213', 'V-', '-', '1er año', 'Masculino', 'N1-413271255', '7 / 1 / 2004', '18 años', 'P-032623-965622233', 'T-032623-781342847');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-413271255', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123123', '21321321'); REPLACE INTO contact_infos 
(student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-413271255', '21321', '21321', '312123', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-413271255', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '123123'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-965622233', '123213', '213213', 'V-', '213213', '123123', '213213', 'V-', '123123'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-781342847', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"213213","lastname":"213213","ci":"V-213213","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-887482209',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-413271255'; DELETE from addresses WHERE student_code = 'N1-413271255'; DELETE from contact_infos WHERE student_code = 'N1-413271255'; DELETE from medical_infos WHERE student_code = 'N1-413271255';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('hhh', 'hhhh', '11111', 'V-', 'Sección A', '1er año', 'Masculino', 
'A1-165047116', '7 / 1 / 2004', '18 años', 'P-032623-539632024', 'T-032623-398389690');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('A1-165047116', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'hhhh', 'hhh'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('A1-165047116', '777', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('A1-165047116', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'hhh'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-539632024', 'hhh', '777', 'V-', 'hhh', 'hhh', '777', 'V-', 'hhh'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-398389690', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"hhh","lastname":"hhhh","ci":"V-11111","seccion":"Sección A","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-035418802',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'A1-165047116'; DELETE from addresses WHERE student_code = 'A1-165047116'; DELETE from contact_infos WHERE student_code = 'A1-165047116'; DELETE from medical_infos WHERE student_code = 'A1-165047116';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('ggg', 'ggg', '888', 'V-', '-', '1er año', 'Masculino', 'N1-153380256', '21 / 1 / 2004', '18 años', 'P-032623-111369662', 'T-032623-117623841');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-153380256', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '888', '888'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-153380256', '888', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-153380256', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '888'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-111369662', '88', '888', 'V-', '8', '8888', '888', 'V-', '88'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-117623841', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"ggg","lastname":"ggg","ci":"V-888","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-311637485',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-153380256'; DELETE from addresses WHERE student_code = 'N1-153380256'; DELETE from contact_infos WHERE student_code = 'N1-153380256'; DELETE from medical_infos WHERE student_code = 'N1-153380256';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('asd', 'asd', '213', 'V-', '-', '1er año', 'Masculino', 'N1-237495603', '7 / 1 / 2004', '18 años', 'P-032623-670103662', 'T-032623-426699227');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('N1-237495603', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '123', '12312'); REPLACE INTO contact_infos (student_code, 
phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('N1-237495603', '213213', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('N1-237495603', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '23213'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-670103662', '123123', '1232132', 'V-', '13213', '213213213', '12321312321', 'V-', '123213'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-426699227', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"asd","lastname":"asd","ci":"V-213","seccion":"-","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-254973723',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'N1-237495603'; DELETE from addresses WHERE student_code = 'N1-237495603'; DELETE from contact_infos WHERE student_code = 'N1-237495603'; DELETE from medical_infos WHERE student_code = 'N1-237495603';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('jjj', 'jjj', '444', 'V-', 'Sección A', '1er año', 'Masculino', 'A1-503069958', '21 / 1 / 2004', '18 años', 'P-032623-117195834', 'T-032623-945235201');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('A1-503069958', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'jjj', 'jjj'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('A1-503069958', '435435', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('A1-503069958', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'jjj'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-117195834', 'jj', '44', 'V-', '777', 'nnn', '5', 'V-', '435'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-945235201', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"jjj","lastname":"jjj","ci":"V-444","seccion":"Sección A","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-169665119',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'A1-503069958'; DELETE from addresses WHERE student_code = 'A1-503069958'; DELETE from contact_infos WHERE student_code = 'A1-503069958'; DELETE from medical_infos WHERE student_code = 'A1-503069958';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('eee', 'eee', '2222', 'V-', 'Sección E', '1er año', 'Masculino', 'E1-410087372', '7 / 1 / 2004', '18 años', 'P-032623-013705340', 'T-032623-715222245');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('E1-410087372', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'eee', 'eeee'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('E1-410087372', '333', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('E1-410087372', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'eee'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-013705340', 'eee', '333', 'V-', 'eeee', 'eeee', '3333', 'V-', 'eeeee'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-715222245', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"eee","lastname":"eee","ci":"V-2222","seccion":"Sección E","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-513688950',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'E1-410087372'; DELETE from addresses WHERE student_code = 'E1-410087372'; DELETE from contact_infos WHERE student_code = 'E1-410087372'; DELETE from medical_infos WHERE student_code = 'E1-410087372';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('qqq', 'qqq', '1111', 'V-', 'Sección B', '1er año', 'Masculino', 'B1-137895478', '13 / 1 / 2004', '18 años', 'P-032623-567536567', 'T-032623-109424917');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('B1-137895478', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'qqq', 'qqq'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('B1-137895478', '111', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('B1-137895478', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'qqq'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-567536567', 'qqq', '111', 'V-', 'qq', 'qqq', '111', 'V-', 'qqq'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-109424917', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"qqq","lastname":"qqq","ci":"V-1111","seccion":"Sección B","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-821306591',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'B1-137895478'; DELETE from addresses WHERE student_code = 'B1-137895478'; DELETE from contact_infos WHERE student_code = 'B1-137895478'; DELETE from medical_infos WHERE student_code = 'B1-137895478';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('www', 'www', '3333', 'V-', 'Sección A', '1er año', 'Masculino', 'A1-327108667', '22 / 1 / 2004', '18 años', 'P-032623-336077179', 'T-032623-770889930');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('A1-327108667', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', '3333', '3333'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('A1-327108667', '333', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations) VALUES ('A1-327108667', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '333'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-336077179', '3333', '33', 'V-', '33333', '33333', '3333', 'V-', '333'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-770889930', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"www","lastname":"www","ci":"V-3333","seccion":"Sección A","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-996206959',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'A1-327108667'; DELETE from addresses WHERE student_code = 'A1-327108667'; DELETE from contact_infos WHERE student_code = 'A1-327108667'; DELETE from medical_infos WHERE student_code = 'A1-327108667';",
    type: '1',
    user: '16193765'
  },
  {
    insertion_query: "REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code) VALUES ('zzz', 'zzz', '9999', 'V-', 'Sección A', '1er año', 'Masculino', 'A1-445710250', '14 / 1 / 2004', '18 años', 'P-032623-797881715', 'T-032623-038263029');  REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school) VALUES ('A1-445710250', 'Venezuela', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'Guárico', 'Monagas', 'Altagracia de Orituco', 'zzz', 'zzz'); REPLACE INTO contact_infos (student_code, phone1, phone2, email, whatsaap1, whatsaap2) VALUES ('A1-445710250', '9999', '', '', 'No suministrado', 'No suministrado'); REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, 
epilepsia, asma, alergias, TDAH, observations) VALUES ('A1-445710250', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'zzz'); REPLACE INTO parents (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work) VALUES ('P-032623-797881715', 'zzz', '999', 'V-', 'zzz', 'zzz', '999', 'V-', 'zzz99'); REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link) VALUES ('T-032623-038263029', 'Venezuela', 'Venezuela', 'Venezuela', 'Venezuela');",
    metadata: '{"name":"zzz","lastname":"zzz","ci":"V-9999","seccion":"Sección A","gender":"Masculino","age":"18 años","grade":"1er año"}',
    register_code: 'R-032623-344544471',
    description: 'Registro de nuevo estudiante',
    rollback_query: "DELETE from students WHERE code = 'A1-445710250'; DELETE from addresses WHERE student_code = 'A1-445710250'; DELETE from contact_infos WHERE student_code = 'A1-445710250'; DELETE from medical_infos WHERE student_code = 'A1-445710250';",
    type: '1',
    user: '16193765'
  }
]



*/