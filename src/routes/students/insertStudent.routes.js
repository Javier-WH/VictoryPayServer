const express = require("express");
const Router = express.Router();


Router.post("/addStudent", express.json(), (req, res)=>{
    console.log(req.body)
    res.status(200).send("OK")
});


module.exports = Router;