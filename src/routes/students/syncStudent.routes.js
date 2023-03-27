const express = require("express");
const Router = express.Router();
const SyncRegister = require("../../joinners/syncRegistersjoinner")



Router.post("/SyncRegister", express.json(),SyncRegister);



module.exports = Router;

