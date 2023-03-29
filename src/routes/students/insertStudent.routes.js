const express = require("express");
const Router = express.Router();
const registerStudent = require("../../joinners/registerStudent.joinner");
const regtisterInscriptionPayment = require("../../joinners/registerInscriptionPayment.joiner");



Router.post("/addStudent", express.json(), registerStudent);

Router.post("/addStudent/inscriptionPayment", express.json(), regtisterInscriptionPayment);

module.exports = Router;

/*
{
    register_code: 'R-032923-523533656',
    user: '16193765',
    description: 'Pago de inscripción de estudiante',
    date: '03/29/2023 09:03:25',
    type: '2',
    metadata: {
      student_code: 'N1-826015620',
      inscription: '100.0',
      cash: '1',
      operation_number: '',
      monthlyPrice: '100.0',
      date: 'Selecciona una fecha',
      status: 'true',
      updatedAT: '03/29/2023 09:03:25',
      tutor_code: 'T-032923-030944788'
    },
    insertion_query: "REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT) VALUES ('N1-826015620', '100.0', '1', '', '100.0', 'Selecciona una fecha', 
  'true', '03/29/2023 09:03:25' ); REPLACE INTO abonos (tutor_code, abono, updatedAT) VALUES ('-1', '20.0' , '03/29/2023 09:03:25');",
    rollback_query: "DELETE FROM inscription_payments WHERE student_code = 'N1-826015620' ; UPDATE abonos SET abono = abono - 20.0  WHERE tutor_code = '-1';"
  }*/