const sequelize = require("../Sequelize/connection");


const QUERY = "CREATE PROCEDURE `getParentsID`( IN motherCi TEXT, IN fatherCi TEXT, OUT parentID LONG )" + 
            " BEGIN" +
                " SET @id = -1;" + 
                " SELECT @id := id FROM parents WHERE `mother_ci` = motherCi AND `father_ci` = fatherCi;" + 
                " SET parentID = @id; " + 
            " END;";

async function startGetParentIDProcedure(){
    await sequelize.query("DROP PROCEDURE IF EXISTS getParentsID;");
    await sequelize.query(QUERY);
}

module.exports = startGetParentIDProcedure;