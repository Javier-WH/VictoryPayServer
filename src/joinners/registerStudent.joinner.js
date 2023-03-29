const sequelize = require("../SQL/Sequelize/connection");
const { createRegister, isRecordExisting } = require("../controllers/register.controller");
const Joi = require('joi');


async function registerStudent(req, res) {

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


/**paymentData
 * 
 * {
  register_code: 'R-032823-838031439',
  user: '16193765',
  description: 'Pago de inscripción de estudiante',
  date: '03/28/2023 18:11:23',
  type: '2',
  metadata: {
    student_code: 'N1-509993475',
    inscription: '100.0',
    cash: '1',
    operation_number: '',
    monthlyPrice: '100.0',
    date: 'Selecciona una fecha',
    status: 'true',
    updatedAT: '03/28/2023 18:11:23',
    tutor_code: 'T-032823-846048259'
  },
  insertion_query: "REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT) VALUES ('N1-509993475', '100.0', '1', '', '100.0', 'Selecciona una fecha', 
'true', '03/28/2023 18:11:23' ); REPLACE INTO abonos (tutor_code, abono, updatedAT) VALUES ('-1', '20.0' , '03/28/2023 18:11:23');",
  rollback_query: "DELETE FROM inscription_payments WHERE student_code = 'N1-509993475' ; UPDATE abonos SET abono = abono - 20.0  WHERE tutor_code = '-1';"
}
{
  register_code: 'R-032823-838031439',
  user: '16193765',
  description: 'Pago de inscripción de estudiante',
  date: '03/28/2023 18:11:23',
  type: '2',
  metadata: {
    student_code: 'N1-509993475',
    inscription: '100.0',
    cash: '1',
    operation_number: '',
    monthlyPrice: '100.0',
    date: 'Selecciona una fecha',
    status: 'true',
    updatedAT: '03/28/2023 18:11:23',
    tutor_code: 'T-032823-846048259'
  },
  insertion_query: "REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT) VALUES ('N1-509993475', '100.0', '1', '', '100.0', 'Selecciona una fecha', 
'true', '03/28/2023 18:11:23' ); REPLACE INTO abonos (tutor_code, abono, updatedAT) VALUES ('-1', '20.0' , '03/28/2023 18:11:23');",
  rollback_query: "DELETE FROM inscription_payments WHERE student_code = 'N1-509993475' ; UPDATE abonos SET abono = abono - 20.0  WHERE tutor_code = '-1';"
}

 */