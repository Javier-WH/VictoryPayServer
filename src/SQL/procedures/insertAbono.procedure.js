const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE insertAbono( " +
	"IN tutorID LONG, " +
    "IN _abono TEXT, " +
    "IN updatedAt TEXT " +
") " +
"BEGIN " +

	"SET @AID = -1; " +
    "SELECT @AID := `id` FROM `abonos` WHERE `tutor_id` = tutorID; " +
    
	"IF @AID < 0 THEN " +
		"INSERT INTO `abonos` (`tutor_id`, `abono`, `updatedAt`) VALUES (tutorID, _abono, updatedAt); " +
	"ELSE " +
		"UPDATE `abonos` SET  `abono` = _abono, `updatedAt` = updatedAt WHERE `tutor_id` = tutorID; " +
    "END IF; " +

"END;";

async function startInsertAbono(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertAbono;");
    await sequelize.query(QUERY);
}

module.exports = startInsertAbono;