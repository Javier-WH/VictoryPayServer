const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertPayment`( " +
		"IN studentID LONG, " +
        "IN inscription TEXT, " +
        "IN cash TEXT, " +
        "IN operationNumber TEXT, " +
        "IN date_ TEXT, " +
        "IN status_ TEXT, " +
        "IN updatedAt TEXT " +
") " +
"BEGIN " +
		"SET @SID = -1; " +
		"SELECT @SID := `student_id` FROM `inscription_payments` WHERE `student_id` = studentID; " +
    
    	"IF @SID < 0 THEN " +
			"INSERT INTO `inscription_payments` (`student_id`, `inscription`, `cash`, `operation_number`, `date`, `status`, `updatedAt`) " +
					"VALUES (studentID, inscription, cash, operationNumber, date_, status_, updatedAt); " +
		"ELSE " +
			"UPDATE `inscription_payments` SET `inscription` = inscription, `cash` = cash, `operation_number` = operationNumber, `date` = date_, `updatedAt` = updatedAt WHERE `student_id` = studentID; " +
		"END IF; " +
"END; ";

async function startInscriptionPayment(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertPayment;");
    await sequelize.query(QUERY);
}

module.exports = startInscriptionPayment;