
function createInsertionQuery(data) {

    let insertQuery = "START TRANSACTION; " +
    `CALL insertTutor("${data.tutorName}", "${data.tutorCi}", "${data.tutorNationality}", "${data.link3}", "${data.timeStamp}", @tutorID); ` +
    `CALL insertParents("${data.motherName}", "${data.motherCi}", "${data.motherNationality}", "${data.motherWork}", "${data.fatherName}", "${data.fatherCi}", "${data.fatherNationality}", "${data.fatherWork}", "${data.timeStamp}", @parentID);  ` +
    `CALL insertStudent("${data.studentName}", "${data.studentLastName}", "${data.studentCi}", "${data.studentNation}", "${data.seccion}", "${data.grade}", "${data.gender}", "${data.code}", "${data.birthDate}", "${data.age}", @parentID, @tutorID, "${data.timeStamp}", @studentID); ` +
	`CALL insertContactInfo( @studentID, "${data.phone1}", "${data.phone2}", "${data.email}", "${data.whatsaap1}", "${data.whatsaap2}", "${data.timeStamp}"); ` +
    `CALL insertAddress(@studentID, "${data.birthCountry}", "${data.birthEstado}", "${data.birthMunicipio}", "${data.birthParroquia}", "${data.liveEstate}", "${data.liveMunicipio}", "${data.liveParroquia}", "${data.address}", "${data.procedence}", "${data.timeStamp}" ); ` +
    `CALL insertMedicalInfo(@studentID, "${data.diabetes}", "${data.hipertension}", "${data.dislexia}", "${data.daltonismo}", "${data.epilepsia}", "${data.asma}", "${data.alergia}", "${data.TDAH}", "${data.observations1_4}", "${data.timeStamp}" ); ` +
    `CALL insertPayment(@studentID, "${data.mount}", "${data.payMethod}", "${data.account}", "${data.date}", "${data.status}", "${data.timeStamp}"); ` +
    "SELECT @studentID; " +
    "COMMIT;"

    let rollbackQuery = "START TRANSACTION; " + 
    `SET @code_ = "${data.code}"; ` +
    "CALL getStudentID(@code_, @SID); " +
    "DELETE FROM students WHERE id = @SID; " +
	"DELETE FROM `addresses` WHERE `student_id` = @SID; " +
	"DELETE FROM `contact_infos` WHERE `student_id` = @SID; " +
	"DELETE FROM `medical_infos` WHERE `student_id` = @SID; " +
	"DELETE FROM `inscription_payments` WHERE `student_id` = @SID; " +    
    "COMMIT;";

    let user = data.user;

    let code = getCode(20); ///el código puede repetirse, existe una infima posibilidad pero no se ha manejado esa excepción

    let pivot = data.studentCi;

    let type = 1;


    return {
        insertQuery,
        rollbackQuery,
        user, 
        code,
        pivot,
        type
    };

}

function getCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = createInsertionQuery;
