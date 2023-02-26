const express = require("express");
const Router = express.Router();


Router.get("/test", (req, res)=>{
    res.status(200).send("ok")
});



module.exports = Router;