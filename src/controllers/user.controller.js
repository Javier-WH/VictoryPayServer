const Users = require("../SQL/models/users.model");


async function addUser(req, res){
    
    if(req.body.user == undefined || req.body.password == undefined || req.body.name == undefined || req.body.ci == undefined){
        res.status(412).send("Datos incompletos");
        return;
    }
    
    try {
        await Users.create(req.body)
        res.status(200).send("OK");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

async function validateUser(req, res){

    if(req.body.user == undefined || req.body.password == undefined){
        res.status(412).send("Datos incompletos");
        return;
    }


    try {
        let {user, password} = req.body;

        let validUser = await Users.findAll({
            where:{
                user,
                password           
            }
        });

        if(validUser.length > 0){
            res.status(200).json(validUser[0]);
            return
        }

        res.status(404).send("No encontrado")

        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }

}

module.exports = {addUser, validateUser}