const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertMedicalInfo`( " +
	"IN studentID LONG, " +
    "IN diabetes TEXT, " +
    "IN hipertension TEXT, " +
    "IN dislexia TEXT, " +
    "IN daltonismo TEXT, " +
    "IN epilepsia TEXT, " +
    "IN asma TEXT, " +
    "IN alergias TEXT, " +
    "IN TDAH TEXT,  " +
    "IN observations TEXT, " + 
    "IN updatedAt TEXT " +
") " +
"BEGIN " +
	"SET @SID = -1; " +
    "SELECT @SID := `student_id` FROM `medical_infos` WHERE `student_id` = studentID; " +
    
	"IF @SID < 0 THEN " +
		"INSERT INTO `medical_infos` (`student_id`, `diabetes`, `hipertension`, `dislexia`, `daltonismo`, `epilepsia`, `asma`, `alergias`, `TDAH`, `observations`, `updatedAt`) " +
				"VALUES (studentID, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations, updatedAt); " +

	"ELSE " +
    
		"UPDATE `medical_infos` SET `diabetes` = diabetes, `hipertension` = hipertension, `dislexia` = dislexia, `daltonismo` = daltonismo, `epilepsia` = epilepsia, " +
				"`asma` = asma, `alergias` = alergias, `TDAH` = TDAH, `observations` = observations, `updatedAt` = updatedAt WHERE `student_id` = studentID; " +

    "END IF; " +
    
"END;";

async function startInsertMedicalInfo(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertMedicalInfo;");
    await sequelize.query(QUERY);
}

module.exports = startInsertMedicalInfo;