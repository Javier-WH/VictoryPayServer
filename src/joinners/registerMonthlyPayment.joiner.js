const Joi = require("joi");
const createMonthlyPaymentRegister = require("../helpers/createMonthlyPaymentRegister");
const sequelize = require("../SQL/Sequelize/connection");
const { createRegister } = require("../controllers/register.controller")

async function monthlyPayment(req, res) {

    const data = req.body;

    const schema = Joi.object({
        data: Joi.array().min(1).required()
    })

    const { error, valor } = schema.validate({ data });


    if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
    }

    const promises = data.map(register => createMonthlyPaymentRegister(register))
    const registers = await Promise.all(promises);







    for (register of registers) {

        if (register.error) {
            res.status(500).json(register);
            return;
        }
        const transaction = await sequelize.transaction();
        try {
            await createRegister(register, transaction);
            await sequelize.query(register.insertion_query, { transaction });
            await transaction.commit();
        } catch (error) {
            console.log(error)
            await transaction.rollback();
            res.status(500).json(registers)
            return
        }

    }

    return res.status(200).json(registers);

}

module.exports = monthlyPayment;




