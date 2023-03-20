const getCode = require("../../helpers/getCode");
const { searchConflicts } = require("../../controllers/student.controller");


async function createStudentSyncQuery(data, _user) {

    let insertQuery = "START TRANSACTION; ";
    data.forEach(student => {
        insertQuery +=
            `CALL insertTutor("${student.tutor_name}", "${student.tutor_ci}", "${student.tutor_nation}", "${student.tutor_link}", "${student.tutorDate}", @tutorID); ` +
            `CALL insertParents("${student.mother_name}", "${student.mother_ci}", "${student.mother_nation}", "${student.mother_work}", "${student.father_name}", "${student.father_ci}", "${student.father_nation}", "${student.father_work}", "${student.parentsDate}", @parentID);  ` +
            `CALL insertStudent("${student.name}", "${student.lastName}", "${student.ci}", "${student.nation}", "${student.seccion}", "${student.grade}", "${student.gender}", "${student.code}", "${student.birthdate}", "${student.age}", @parentID, @tutorID, "${student.updatedAT}", @studentID); ` +
            `CALL insertContactInfo( @studentID, "${student.phone1}", "${student.phone2}", "${student.email}", "${student.whatsapp1}", "${student.whatsapp2}", "${student.contactDate}"); ` +
            `CALL insertAddress(@studentID, "${student.birth_country}", "${student.birth_state}", "${student.birth_municipio}", "${student.birth_parroquia}", "${student.live_state}", "${student.live_municipio}", "${student.live_parroquia}", "${student.address}", "${student.procedence_school}", "${student.addressDate}" ); ` +
            `CALL insertMedicalInfo(@studentID, "${student.diabetes}", "${student.hipertension}", "${student.dislexia}", "${student.daltonismo}", "${student.epilepsia}", "${student.asma}", "${student.alergias}", "${student.TDAH}", "${student.observations}", "${student.medicalDate}" ); ` +
            `CALL insertPayment(@studentID, "${student.inscription}", "${student.cash}", "${student.operation_number}", "${student.date}", "${student.status}", "${student.inscriptionPrice}", "${student.paymentDate}"); ` +
            `CALL insertAbono(@tutorID, "${student.abono}", "${student.abonoDate}"); `;
    });
    insertQuery += "COMMIT;";


    let conflicts = await searchConflicts(data);


    let rollbackQuery = "";

    let user = _user;

    let code = getCode(20);

    let pivot = "Sincronización del Sistema";

    let type = 5;

    if(conflicts.length > 0){
        rollbackQuery = "START TRANSACTION; ";

        conflicts.forEach(student => {
            rollbackQuery +=
                `CALL insertTutor("${student.tutor_name}", "${student.tutor_ci}", "${student.tutor_nation}", "${student.tutor_link}", "${student.tutorDate}", @tutorID); ` +
                `CALL insertParents("${student.mother_name}", "${student.mother_ci}", "${student.mother_nation}", "${student.mother_work}", "${student.father_name}", "${student.father_ci}", "${student.father_nation}", "${student.father_work}", "${student.parentsDate}", @parentID);  ` +
                `CALL insertStudent("${student.name}", "${student.lastName}", "${student.ci}", "${student.nation}", "${student.seccion}", "${student.grade}", "${student.gender}", "${student.code}", "${student.birthdate}", "${student.age}", @parentID, @tutorID, "${student.updatedAt}", @studentID); ` +
                `CALL insertContactInfo( @studentID, "${student.phone1}", "${student.phone2}", "${student.email}", "${student.whatsaap1}", "${student.whatsaap2}", "${student.contactDate}"); ` +
                `CALL insertAddress(@studentID, "${student.birth_country}", "${student.birth_state}", "${student.birth_municipio}", "${student.birth_parroquia}", "${student.live_state}", "${student.live_municipio}", "${student.live_parroquia}", "${student.address}", "${student.procedence_school}", "${student.addressDate}" ); ` +
                `CALL insertMedicalInfo(@studentID, "${student.diabetes}", "${student.hipertension}", "${student.dislexia}", "${student.daltonismo}", "${student.epilepsia}", "${student.asma}", "${student.alergias}", "${student.TDAH}", "${student.observations}", "${student.medicalDate}" ); ` +
                `CALL insertPayment(@studentID, "${student.inscription}", "${student.cash}", "${student.operation_number}", "${student.date}", "${student.status}", "${student.inscriptionPrice}", "${student.paymentDate}"); `;
            `CALL insertAbono(@tutorID, "${student.abono}", "${student.abonoDate}"); `;
        });
        rollbackQuery += "COMMIT;";
        pivot += " (Conflictos)";
    }


    return {
        insertQuery,
        rollbackQuery,
        user,
        code,
        pivot,
        type
    };


}

module.exports = { createStudentSyncQuery };
