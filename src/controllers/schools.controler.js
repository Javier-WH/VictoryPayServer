const Schools = require("../SQL/models/schools.model");

async function getSchoolsList(){
    const schools = await Schools.findAll({raw:true});
    return schools
}

async function addSchool(school, transaction){
    const insert = Schools.upsert({
        school
    },{
        transaction
    })
    return insert;
}

module.exports = {getSchoolsList, addSchool}