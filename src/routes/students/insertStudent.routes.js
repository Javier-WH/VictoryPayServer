const express = require("express");
const Router = express.Router();
const registerStudent = require("../../joinners/registerStudent.joinner");




Router.post("/addStudent", express.json(), registerStudent);

Router.post("/resolveInsertion", express.json(), (req, res)=>(res.send("hola")));

module.exports = Router;

  