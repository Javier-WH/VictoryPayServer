const Abono = require("./SQL/models/abono.model");
const Address = require("./SQL/models/address.model");
const Contact_info = require("./SQL/models/contact_info.model");
const Inscription_payment = require("./SQL/models/inscription_payment.model");
const Medical_info = require("./SQL/models/medical_info.model");
const Parents = require("./SQL/models/parents.model");
const Prices = require("./SQL/models/prices.model");
const Schools = require("./SQL/models/schools.model");
const Users = require("./SQL/models/users.model");
const Tutors = require("./SQL/models/tutors.model");
const Students = require("./SQL/models/students.model");
const Register = require("./SQL/models/registers.model");

function checkTables(){
    console.log("Tablas inicializadas");
}

module.exports = checkTables;