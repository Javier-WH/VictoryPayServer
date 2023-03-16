const getCode = require("../../helpers/getCode");

function createStudentSyncQuery(data, removedItems) {

    let insertQuery = "START TRANSACTION; ";

    data.forEach(student => {
       insertQuery += `CALL insertStudent("${student.name}", "${student.lastName}", "${student.ci}", "${student.nation}", "${student.seccion}", "${student.grade}", "${student.gender}", "${student.code}", "${student.birthdate}", "${student.age}", "${student.parent_id}", "${student.tutor_id}", "${student.updatedAt}", @studentID); `
    });   
    
    insertQuery += "COMMIT;";

    let rollbackQuery = "START TRANSACTION; " + 
    `SET @code_ = "${student.code}"; ` +
    "CALL getStudentID(@code_, @SID); " +
    "DELETE FROM students WHERE id = @SID; " +
	"DELETE FROM `addresses` WHERE `student_id` = @SID; " +
	"DELETE FROM `contact_infos` WHERE `student_id` = @SID; " +
	"DELETE FROM `medical_infos` WHERE `student_id` = @SID; " +
	"DELETE FROM `inscription_payments` WHERE `student_id` = @SID; " +    
    "COMMIT;";

    let user = student.user;

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

module.exports = {createStudentSyncQuery};
