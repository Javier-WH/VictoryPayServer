const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertAddress`(" +
	"IN studentID LONG," +
    "IN birthCountry TEXT," +
    "IN birthState TEXT," +
    "IN birthMunicipio TEXT," +
    "IN birthParroquia TEXT," +
    "IN liveState TEXT," +
    "IN liveMunicipio TEXT," +
    "IN liveParroquia TEXT," +
    "IN address TEXT," +
    "IN procedenceSchool TEXT," +
    "IN updatedAt TEXT" +
")" +
"BEGIN " +
		"SET @SID = -1; " +
		"SELECT @SID := `student_id` FROM `addresses` WHERE `student_id` = studentID; " +
        
        "IF @SID < 0 THEN " +
			"INSERT INTO `addresses` (`student_id`, `birth_country`, `birth_state`, `birth_municipio`, `birth_parroquia`, `live_state`, `live_municipio`, `live_parroquia`, `address`, `procedence_school`, `updatedAt`) " +
					"VALUES (studentID, birthCountry, birthState, birthMunicipio, birthParroquia, liveState, liveMunicipio, liveParroquia, address, procedenceSchool, updatedAt); " +
		"ELSE " +
			"UPDATE `addresses` SET `birth_country` = birthCountry, `birth_state` = birthState, `birth_municipio` = birthMunicipio, `birth_parroquia` = birthParroquia, " +
									"`live_state` = liveState, `live_municipio` = liveMunicipio , `live_parroquia` = liveParroquia, `address` = address, " +
                                    "`procedence_school` = procedenceSchool, `updatedAt` = updatedAt WHERE `student_id` = studentID; " +
        "END IF; "+

" END;";

async function startInsertAddress(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertAddress;");
    await sequelize.query(QUERY);
}

module.exports = startInsertAddress;