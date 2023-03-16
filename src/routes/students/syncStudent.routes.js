const express = require("express");
const Router = express.Router();
const SyncStudents = require("../../joinners/syncStudents.joinner")



Router.post("/syncStudents", express.json(),SyncStudents);



module.exports = Router;

