const Students = require("../SQL/models/students.model");

async function isStudentCiRegistered(ci){

    const count = await Students.count({
        where:{
            ci
        }
    });

    if(count > 0){
        return true;
    }
    return false;
}

module.exports = {isStudentCiRegistered};