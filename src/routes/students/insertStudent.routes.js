const express = require("express");
const Router = express.Router();
const registerStudent = require("../../joinners/registerStudent.joinner");
const regtisterInscriptionPayment = require("../../joinners/registerInscriptionPayment.joiner");
const monthlyPayment = require("../../joinners/registerMonthlyPayment.joiner")


Router.post("/addStudent", express.json(), registerStudent);

Router.post("/addStudent/inscriptionPayment", express.json(), regtisterInscriptionPayment);

Router.post("/addStudent/monthlyPayment", express.json(), monthlyPayment);

module.exports = Router;
