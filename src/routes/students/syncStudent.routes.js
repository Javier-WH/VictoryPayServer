const express = require("express");
const Router = express.Router();
const SyncRegister = require("../../joinners/syncRegistersjoinner")
const getRegisterPage = require("../../joinners/getRegisterPage.joiner");
const getAbonoPage = require("../../joinners/getAbonoPage.joiner")

Router.post("/SyncRegister", express.json(),SyncRegister);

Router.post("/SyncRegister/getPage", express.json(), getRegisterPage);

Router.post("/SyncRegister/getAbonoPage", express.json(), getAbonoPage);

module.exports = Router;

