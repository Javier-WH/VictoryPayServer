const sequelize = require("../SQL/Sequelize/connection");
const { createRegister, isRecordExisting } = require("../controllers/register.controller");
const Joi = require('joi');
const {getAbono} = require("../controllers/abono.controller");
const { number } = require("joi");


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
          const isRecordExistingResult = await isRecordExisting(data.register_code);
          if (isRecordExistingResult) {
            await transaction.rollback();
            return res.status(409).json({ error: 'El pago ya está registrado' });
          }


          //revisa que el metadata tenga los datos correctos
          const metadataSchema = Joi.object({
            student_code: Joi.string().required(),
            inscription: Joi.string().required(),
            cash: Joi.string().required(),
            operation_number: Joi.string().allow(""),
            monthlyPrice: Joi.string().required(),
            date: Joi.string().required(),
            status: Joi.string().required(),
            updatedAT : Joi.date().required(),
            tutor_code: Joi.string().required()
          });

          const { error, value: metadata } = metadataSchema.validate(data.metadata);

          if (error) {
            console.log(error.details[0].message)
            return res.status(400).json({ error: error.details[0].message });
          }


        // se revisa el pago antes de registrarlo.
        let register_code = data.register_code;
        let {student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT, tutor_code} = metadata;
/*
        let currentAbono = await getAbono(tutor_code);
        let inscriptionPrice = monthlyPrice;
        let payment = inscription;
   
        let currentAbonoPlusPayment = Number.parseFloat(currentAbono) +  Number.parseFloat(payment);
        let total = Number.parseFloat(currentAbonoPlusPayment) - number.parseFloat(inscriptionPrice);
        
        let abono = 0;
        let pay = 0

        if(total >= 0){
            abono = total
            pay = inscriptionPrice;
        }else{
            abono = currentAbonoPlusPayment;
            pay = 0
        }

        let insertion_query = "REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT) VALUES " +
        `('${student_code}', '${pay}', '${cash}', '${operation_number}', '${monthlyPrice}', '${date}', '${status}', '${updatedAT}' ); ` + 
        `REPLACE INTO abonos (tutor_code, abono, updatedAT) VALUES ('-1', '20.0' , '03/29/2023 09:03:25');`;
*/

          await createRegister(data, transaction);
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
