const express = require("express");
const Router = express.Router();
const syncSchools = require("../../joinners/syncSchools.joiner");




Router.post("/syncSchools", express.json(), syncSchools)










module.exports = Router;

