const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `getTutorID`( IN tutorCI TEXT, OUT tutorID LONG )" + 
            " BEGIN" + 
                " SET @id = -1;" + 
                " SELECT @id := id FROM tutors WHERE tutor_ci = tutorCI;" + 
                " SET tutorID = @id;" + 
            " END;";

async function startGetTutorIDProcedure(){
    await sequelize.query("DROP PROCEDURE IF EXISTS getTutorID;");
    await sequelize.query(QUERY);
}

module.exports = startGetTutorIDProcedure;