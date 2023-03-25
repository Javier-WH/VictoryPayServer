const sequelize = require("../SQL/Sequelize/connection");
const { createRegister, isRecordExisting } = require("../controllers/register.controller");
const Joi = require('joi');


async function registerStudent(req, res) {

    try {
        const schema = Joi.object({
          register_code: Joi.string().required(),
          user: Joi.string().required(),
          description: Joi.string().required(),
          date: Joi.date().required(),
          type: Joi.string().required(),
          insertion_query: Joi.string().required(),
          rollback_query: Joi.string().required(),
        });
    
        const { error, value: data } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        const transaction = await sequelize.transaction();
    
        try {
          const isRecordExistingResult = await isRecordExisting(data.register_code);
          if (isRecordExistingResult) {
            await transaction.rollback();
            return res.status(409).json({ error: 'El estudiante ya está registrado' });
          }
          await createRegister(data, transaction);
          await sequelize.query(data.insertion_query, { transaction });
          await transaction.commit();
          return res.status(200).json(data);
        } catch (error) {
          await transaction.rollback();
          console.error(error);
          return res.status(500).json({ error: 'No se ha podido registrar al estudiante' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ha ocurrido un error inesperado' });
      }
}

module.exports = registerStudent;