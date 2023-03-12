const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `getStudentID`(IN _code TEXT, OUT studentID LONG) " + 
            "BEGIN " + 
                "SET @id = -1; " + 
                "SELECT @id := id FROM students WHERE `code`= _code; " +
                "SET studentID = @id; " + 
            "END;";

async function startGetStudentIDProcedure(){
    await sequelize.query("DROP PROCEDURE IF EXISTS getStudentID;");
    await sequelize.query(QUERY);
}

module.exports = startGetStudentIDProcedure;