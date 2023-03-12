const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertStudent`( " +
    "IN name_ TEXT, " +
	"IN lastName TEXT, " +
    "IN ci TEXT, " +
    "IN nation TEXT, " +
    "IN seccion TEXT, " +
    "IN grade TEXT, " +
    "IN gender TEXT, " +
    "IN code_ TEXT, " +
    "IN birthDate TEXT, " +
    "IN age TEXT, " +
    "IN parentID TEXT, " +
    "IN tutorID TEXT, " +
    "IN updatedAt TEXT, " +
    "OUT studentID LONG " +
") " +
"BEGIN " +
	
        " CALL getStudentID(code_, @SID);  " +
	
    "IF @SID < 0 THEN  " +
		"INSERT INTO `students` ( `name`, `lastName`, `ci`, `nation`, `seccion`, `grade`, `gender`, `code`, `birthDate`, `age`, `parent_id`, `tutor_id`, `updatedAt`)  " +
					    "VALUES (name_, lastName, ci, nation, seccion, grade, gender, code_, birthDate, age, parentID, tutorID, updatedAt);  " +
		"SET studentID = LAST_INSERT_ID();  " +
	"ELSE  " + 
		"UPDATE `students` SET `name` = name_, `lastName` = lastName, `ci` = ci, `nation` = nation, `seccion` = seccion, `grade` = grade, `gender` = gender, `code` = code_,  " +
							"`birthDate` = birthDate, `age` = age, `parent_id` = parentID, `tutor_id` = tutorID, `updatedAt` = updatedAt WHERE `id` = @SID;  " +
		"SET studentID = @SID;  " +
	"END IF;  " +

"END;";

async function startInsertStudent(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertStudent;");
    await sequelize.query(QUERY);
}

module.exports = startInsertStudent;