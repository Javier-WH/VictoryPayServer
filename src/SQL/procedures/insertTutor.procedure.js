const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertTutor`( " +
"IN tutorName TEXT, " +
"IN tutorCi TEXT, " +
"IN tutorNation TEXT, " +
"IN tutorLink TEXT, " +
"IN updatedAT TEXT, " +
"OUT _ID LONG " +
") " +
"BEGIN " +
	
	"CALL getTutorID(tutorCi, @TID); " +

	"IF @TID < 0 THEN " +
		"INSERT INTO `tutors`(`tutor_name`, `tutor_ci`, `tutor_nation`, `tutor_link`, `updatedAt`) VALUES (tutorName, tutorCi, tutorNation, tutorLink, updatedAT); " +
        "SET _ID = LAST_INSERT_ID(); " +
    "ELSE " +
		"UPDATE `tutors` SET `tutor_name` = tutorName, `tutor_ci` = tutorCi, `tutor_nation` = tutorNation, `tutor_link` = tutorLink, `updatedAt` = updatedAT WHERE `id` = @TID; " +
        "SET _ID = @TID; " +
    "END IF; " +

"END;";

async function startInsertTutor(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertTutor;");
    await sequelize.query(QUERY);
}

module.exports = startInsertTutor;