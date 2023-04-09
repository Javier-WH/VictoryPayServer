const Joi = require("joi");
const createMonthlyPaymentRegister = require("../helpers/createMonthlyPaymentRegister");
const sequelize = require("../SQL/Sequelize/connection");
const { getAbono } = require("../controllers/abono.controller");
const { isRecordExisting } = require("../controllers/register.controller")
const { createRegister } = require("../controllers/register.controller");



async function monthlyPayment(req, res) {
    let PAYMENT_DONE = 0;
    let MONTHS = 0;
    let MONTHLY_PRICE = 0;
    let pays = [];

    const data = req.body;
    //revisa que se recibe un array de al menos un elemento
    const schema = Joi.object({
        data: Joi.array().min(1).required()
    })

    const { error, valor } = schema.validate({ data });


    if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
    }

    //valida cada una de los indices del array
    for (let register of data) {
        const schema = Joi.object({
            register_code: Joi.string().required(),
            student_code: Joi.string().required(),
            tutor_code: Joi.string().required(),
            payment: Joi.number().required(),
            monthly_price: Joi.number().required(),
            cash: Joi.string().required(),
            operation_number: Joi.string().required(),
            operation_date: Joi.date().required(),
            months: Joi.number().required(),
            user: Joi.number().required(),
            updatedAT: Joi.date().required()
        });

        const { error, valor } = schema.validate(register);

        if (error) {
            console.log(error.details[0].message)
            res.status(500).json({ error: "los datos no son correctos" })
            return
        }
    }

    const recordExist = await isRecordExisting(data[0].register_code);
    if (recordExist) {
        res.status(500).json({ error: "el registo ya existe" })
        return
    }


    for (let register of data) {
        //la cantidad de meses a pagar
        MONTHS += Number.parseInt(register.months);

        student = {};
        student[register.student_code] = register.months;
        pays.push(student)

    }
    //la fecha
    let updatedAT = data[0].updatedAT;

    //el pago hecho
    PAYMENT_DONE = data[0].payment;

    //el precio del mes
    MONTHLY_PRICE = data[0].monthly_price;

    //la cantidad que se debe pagar
    let required_payment = Number.parseFloat(MONTHLY_PRICE) * Number.parseFloat(MONTHS);

    //el tutor
    let tutor_code = data[0].tutor_code;

    //El abono que tiene el tutor almacenado
    let stored_abono = await getAbono(tutor_code);

    //
    let subtotal = Number.parseFloat(stored_abono) + Number.parseFloat(PAYMENT_DONE);

    //el total despuyes de sumar el abono + deposito - el dinero a pagar
    let total = subtotal - Number.parseFloat(required_payment);


    let abono_diference = total - stored_abono;
    let insertion_query = "";
    let rollback_query = "";

    if (total >= 0) {

        insertion_query = `INSERT INTO abonos (tutor_code, abono, updatedAT) VALUES ('${tutor_code}', '${total}', '${updatedAT}') ` +
            `ON DUPLICATE KEY UPDATE abono = abono + ${abono_diference}, updatedAT = '${updatedAT}'; `;

        rollback_query = `UPDATE abonos SET abono = abono - ${abono_diference}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}'; `

        const promises = data.map(register => createMonthlyPaymentRegister(register))
        const registers = await Promise.all(promises);

        for (register of registers) {

            insertion_query += register.insertion_query;
            rollback_query += register.rollback_query

        }


    } else {

        insertion_query = `INSERT INTO abonos (tutor_code, abono, updatedAT) VALUES ('${tutor_code}', '${subtotal}', '${updatedAT}') ` +
            `ON DUPLICATE KEY UPDATE abono = abono + ${PAYMENT_DONE}, updatedAT = '${updatedAT}' `;

        rollback_query = `Update abonos SET abono = abono - ${PAYMENT_DONE}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}';`
    }

    let register_data = {
        register_code: data[0].register_code,
        user: data[0].user,
        description: "Pago de mensualidad",
        date: getCurrentDate(),
        type: 3,
        metadata: {
            pays, 
            monts: MONTHS,
            required_payment,
            stored_abono,
            payment_done : PAYMENT_DONE,
            total_money : subtotal
        },
        insertion_query,
        rollback_query,
        updatedAT
    }

  

    const transaction = await sequelize.transaction();

    try {
        //await createRegister(register_data, transaction);
        await sequelize.query(register_data.insertion_query, { transaction });

    } catch (error) {
        console.log(error)
        await transaction.rollback();
        res.status(500).json({error: "Ocurrió un error al intentar insrtar el registro"})
        return
    }



    await transaction.commit();
    return res.status(200).json(register_data);

}

module.exports = monthlyPayment;


function getCurrentDate() {
    const fecha = new Date();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    const fechaActual = `${mes}/${dia}/${anio} ${horas}:${minutos}:${segundos}`;
    return fechaActual;
}