const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertContactInfo`( " +
	"IN studentID LONG, " +
    "IN phone1 TEXT, " +
    "IN phone2 TEXT, " +
    "IN email TEXT, " +
    "IN whatsaap1 TEXT, " +
    "IN whatsaap2 TEXT, " +
    "IN updatedAt TEXT " +
") " +
"BEGIN " +
	"SET @SID = -1; " +
    "SELECT @SID := `student_id` FROM `contact_infos` WHERE `student_id` = studentID; " +

	"IF @SID < 0 THEN " +
		"INSERT INTO `contact_infos` (`student_id`, `phone1`, `phone2`, `email`, `whatsaap1`, `whatsaap2`, `updatedAt`) " +
							"VALUES  (studentID, phone1, phone2, email, whatsaap1, whatsaap2, updatedAt); " +
	"ELSE " +
		"UPDATE `contact_infos` SET `phone1` = phone1, `phone2` = phone2, `email` = email, `whatsaap1` = whatsaap1, `whatsaap2` = whatsaap2, `updatedAt` = updatedAt " +
								"WHERE `student_id` = studentID; " +
    "END IF; " +

"END;";

async function startInsertContactInfo(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertContactInfo;");
    await sequelize.query(QUERY);
}

module.exports = startInsertContactInfo;