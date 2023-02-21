const express = require("express");
const path =  require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: path.join(__dirname, ".env")});
const getIP = require("./networkInterfaces.js");


app.use(require("./routes/login.routes"));


app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, error=>{
    console.clear();

    if(error){
        console.log(error);
        return;
    }
    console.log(`El servidor a iniciado en la dirección ${getIP()}:${process.env.SERVER_PORT}`);

});

