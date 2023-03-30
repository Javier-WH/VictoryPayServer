const express = require("express");
const Router = express.Router();
const SyncRegister = require("../../joinners/syncRegistersjoinner")
const getRegisterPage = require("../../joinners/getRegisterPage.joiner");


Router.post("/SyncRegister", express.json(),SyncRegister);

Router.post("/SyncRegister/getPage", express.json(), getRegisterPage);



module.exports = Router;

