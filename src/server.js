const express = require("express");
const path =  require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path: path.join(__dirname, ".env")});
const getIP = require("./networkInterfaces.js");
const checkTables = require("./initTables");
const starProcedurres = require("./SQL/procedures/startProcedures");


app.use(require("./routes/confirm.routes"));
app.use(require("./routes/login.routes"));
app.use(require("./routes/students/insertStudent.routes"));
app.use(require("./routes/students/syncStudent.routes"));
app.use(require("./routes/students/syncConfig.routes"));


app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, async error=>{
    console.clear();

    if(error){
        console.log(error);
        return;
    }
    console.log(`El servidor a iniciado en la dirección ${getIP()}:${process.env.SERVER_PORT}`);
    checkTables();
    //await starProcedurres();

});

