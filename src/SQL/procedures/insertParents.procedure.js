const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `insertParents`( " +
	"IN motherName TEXT, " +
    "IN motherCi TEXT," +
    "IN motherNation TEXT, " +
    "IN motherWork TEXT, " +
    "IN fatherName TEXT, " +
    "IN fatherCi TEXT, " +
    "IN fatherNation TEXT, " +
    "IN fatherWork TEXT, " +
    "IN updatedAt TEXT, " +
    "OUT parentsID LONG" +
") " +
"BEGIN " +
		"CALL getParentsID(motherCi, fatherCi, @PID); " +
		
        "IF @PID < 0 THEN " +
			"INSERT INTO `parents`(`mother_name`, `mother_ci`, `mother_nation`, `mother_work`, `father_name`, `father_ci`, `father_nation`, `father_work`, `updatedAt`) VALUES( motherName, motherCi, motherNation, motherWork, fatherName, fatherCi, fatherNation, fatherWork, updatedAt); " +
			"SET parentsID = LAST_INSERT_ID(); " +
		"ELSE " +
			"UPDATE `parents` SET `mother_name` = motherName, `mother_ci` = motherCi, `mother_nation` = motherNation, `mother_work` = motherWork, `father_name` = fatherName, `father_ci` = fatherCi, `father_nation` = fatherNation, `father_work` = fatherWork, `updatedAt` = updatedAt WHERE `id` = @PID; " +
			"SET parentsID = @PID; " +
		"END IF; " +

"END;";

async function startInsertParents(){
    await sequelize.query("DROP PROCEDURE IF EXISTS insertParents;");
    await sequelize.query(QUERY);
}

module.exports = startInsertParents;