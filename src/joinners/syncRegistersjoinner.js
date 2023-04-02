const Joi = require("joi");
const {isRecordExisting, createRegister} = require("../controllers/register.controller");
const sequelize = require("../SQL/Sequelize/connection");
const createIinscriptionPaymentRegister = require("../helpers/createIinscriptionPaymentRegister")


async function SyncRegister(req, res) {

    let list = req.body
  

    //reviso que los datos enviados sean un array con al menos 1 dato
    const schema = Joi.object({
        students_data: Joi.array().required()
    }).messages({
        'array.base': 'Los datos enviados no son correctos',
        'array.min': 'No ha suministrado ningun dato'
    });

    const { error, value: data } = schema.validate({ students_data: list });
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
    }

    //reviso que la estructura del array sea consistente

    for (register of list) {

        const schema = Joi.object({
            insertion_query: Joi.string().required(),
            rollback_query: Joi.string().required(),
            metadata: Joi.string().required(),
            register_code: Joi.string().required(),
            description: Joi.string().required(),
            type: Joi.string().required(),
            user: Joi.string().required(),
            updatedAT : Joi.string()

        }).messages({
            'any.required': 'La estructura de la lista de datos no es correcta'
        });
        const { error, value: data } = schema.validate(register);
        if (error) {
            console.log(error.details[0].message)
            return res.status(400).json({ error: error.details[0].message });
        }

    }

    let updateTransaction = await sequelize.transaction();
    for (register of list){

      let isRegistered = await isRecordExisting(register.register_code);
      //si el registgro no está registrado
      if(!isRegistered){
      
        try {

          if(register.type == 2){
        
           register = await createIinscriptionPaymentRegister(register);
        
          }

          await createRegister(register, updateTransaction);
          await sequelize.query(register.insertion_query, {transaction:updateTransaction });
        } catch (error) {
          await updateTransaction.rollback();
          console.log(error);
          return res.status(500).json({error: "No se pudo insertar el registro"});
        }

      }
    }

    await updateTransaction.commit();

    return res.status(200).json({message: "ok"})

}

module.exports = SyncRegister;

