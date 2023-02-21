const express = require("express");
const Router = express.Router();
const {addUser, validateUser} = require("../controllers/user.controller");

Router.post("/addUser", express.json(), addUser);

Router.post("/login", express.json(), validateUser);

module.exports = Router;