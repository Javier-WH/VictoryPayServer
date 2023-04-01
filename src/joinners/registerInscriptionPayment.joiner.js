const sequelize = require("../SQL/Sequelize/connection");
const { createRegister, isRecordExisting } = require("../controllers/register.controller");
const Joi = require('joi');
const createIinscriptionPaymentRegister = require("../helpers/createIinscriptionPaymentRegister")



async function regtisterInscriptionPayment(req, res) {

  let studenData = req.body

  try {
    const schema = Joi.object({
      register_code: Joi.string().required(),
      user: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      type: Joi.string().required(),
      insertion_query: Joi.string().required(),
      rollback_query: Joi.string().required(),
      metadata: Joi.object().required()
    });

    const { error, value: data } = schema.validate(studenData);
    if (error) {
      console.log(error.details[0].message)
      return res.status(400).json({ error: error.details[0].message });
    }

    const transaction = await sequelize.transaction();

    try {
      // se revisa el pago antes de registrarlo.
      const isRecordExistingResult = await isRecordExisting(data.register_code);
      if (isRecordExistingResult) {
        await transaction.rollback();
        return res.status(409).json({ error: 'El pago ya está registrado' });
      }


      //revisa que el metadata tenga los datos correctos
      const metadataSchema = Joi.object({
        student_code: Joi.string().required(),
        inscription: Joi.number().required(),
        cash: Joi.string().required(),
        operation_number: Joi.string().allow(""),
        monthlyPrice: Joi.string().required(),
        date: Joi.string().required(),
        status: Joi.string().required(),
        updatedAT: Joi.date().required(),
        tutor_code: Joi.string().required()
      });

      const { error, value: metadata } = metadataSchema.validate(data.metadata);

      if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
      }

      let register = await createIinscriptionPaymentRegister(studenData);
  

      await createRegister(register, transaction);
      await sequelize.query(data.insertion_query, { transaction });
      await transaction.commit();
      return res.status(200).json(data);
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'No se ha podido registrar el pago' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ha ocurrido un error inesperado' });
  }
}

module.exports = regtisterInscriptionPayment;
