const { getMontlyPaymentsInfo } = require("../controllers/monthlyPayment.controller")
const Joi = require("joi")
const { isRecordExisting } = require("../controllers/register.controller")
const { getAbono, abonoRegisterExist } = require("../controllers/abono.controller")

async function createMonthlyPaymentRegister(register) {

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
    return { error: "los datos no son correctos" };
  }
  const { student_code, tutor_code, payment, monthly_price, cash, operation_number, operation_date, months, register_code, user, updatedAT } = register;

  //revisa que el registro no este registrado
  const recordExist = await isRecordExisting(register_code);
  if (recordExist) {
    return { error: "el registo ya existe" }
  }

  //obtiene el abono del tutor
  const abono = await getAbono(tutor_code);

  //obtiene la información de los meses pagados por el estudiante
  const monthly_payment_info = await getMontlyPaymentsInfo(student_code);

  // multiplica el precio del mes por los meses a pagar, asi se obtiene la deuda total
  const requieredPayment = monthly_price * months;

  //suma el abono almacenado al dinero suministrado y se obtiene la cantidad de dinero total que dispone el tutor
  const money = Number.parseFloat(payment) + Number.parseFloat(abono);

  //se resta el dinero total menos la deuda
  const total = money - requieredPayment;

  //la diferencia del abono en la sentencia SQL si el dinero no alcanza para pagar los meses solicitados
  const abonoDiference = {
    add: `+${payment}`,
    less: `-${payment}`
  };

  //obtiene el ultimo pago realizado
  const last_PaymentDone = monthly_payment_info?.last_payment ?? getCurrentDate();
  //const last_PaymentDone ="2022/11/5"
  //lista de meses que se deben
  const pending_payments = getDateArray(last_PaymentDone)

  let last_payment = "";

  //si se pagan mas meses que los meses que se deben
  if (months > pending_payments.length) {
    //se calcula la diferencia entre los meses que se deben y los meses que se pagan
    let diferenceMonths = months - pending_payments.length;
   
    //a la fecha actual se le suma la difetencia de meses
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + diferenceMonths);
    last_payment = formatDate(currentDate);

    //si se deben mas meses de los que se pagan
  } else if (pending_payments.length > months) {

    //se eliminan los meses mas viejos
    for (let i = 0; i < months; i++) {
      pending_payments.shift();
    }
    //se obtiene la fecha mas vieja que queda
    last_payment = pending_payments[0]

    //la ultima opcion, que sean iguales
  } else {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    last_payment = formatDate(currentDate)
  }


    /**
     * si total < 0 implica que no alcanzó el dinero, por lo tanto ese dinero se abona
     * el abono es igual al money
     * 
     * si el total es mayor o igual a 0, implica que el dinero si alcanzó
     * 
     *por lo tanto se acturaliza la fecha de pago
     la fecha esta almacenada en last_payment y para el rollback se almacena en last_PaymentDone

     el abono en este caso es lo que está guardado en la variable total.
     * 
     */


  let insertion_query = "";
  let rollback_query = "";
//verifica si existe un registro en la tabla abonos para el tutor
  const abonoExist = await abonoRegisterExist(tutor_code);
 // console.log({abonoExist: abonoExist == true});
  //si el total de dinero no alcanza para pagar los meses, entonces se abona
  if (total < 0) {

    if(abonoExist){
      insertion_query = `UPDATE abonos SET  abono = abono + ${abonoDiference.add}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}'`;

      rollback_query = `UPDATE abonos SET  abono = abono + ${abonoDiference.less}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}'`;

    }else{
      insertion_query = `INSERT INTO abonos (tutor_code, abono, updatedAT) VALUES ('${tutor_code}', '${money}', '${updatedAT}');`;

      rollback_query = `UPDATE abonos SET  abono = abono + ${money}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}'`;
    }

  } else {

    let abn = Math.abs(abono - total);

    if(abonoExist){
      insertion_query = `UPDATE monthly_payments SET last_payment = '${last_payment}', updatedAT = '${updatedAT}' WHERE student_code = '${student_code}'; ` +
      `UPDATE abonos SET  abono = abono + ${abn}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}'`;

    }else{
      insertion_query = `INSERT INTO monthly_payments (student_code, last_payment, updatedAT) VALUES ('${student_code}', '${last_payment}', '${updatedAT}'); ` +
      `INSERT INTO abonos (tutor_code, abono, updatedAT) VALUES ('${tutor_code}', '${total}', '${updatedAT}')`;
    }

    rollback_query = `UPDATE monthly_payments SET last_payment = '${last_PaymentDone}', updatedAT = '${updatedAT}' WHERE student_code = '${student_code}'; ` +
    `UPDATE abonos SET  abono = abono - ${abn}, updatedAT = '${updatedAT}' WHERE tutor_code = '${tutor_code}'`;

  }

  return {
    register_code: register_code,
    user: user,
    description: "Pago de mensualidad de estudiante",
    date: "03/29/2023 09:03:25",
    type: "3",
    metadata: {
      student_code,
      payment,
      cash,
      operation_number,
      monthly_price,
      operation_date,
      updatedAT,
      tutor_code,
      months,
      pending_payments
    },
    insertion_query,
    rollback_query
  }
}


module.exports = createMonthlyPaymentRegister;

function monthsToPay(fecha) {
  // Convertir la fecha suministrada en un objeto Date
  const fechaSuministrada = new Date(fecha);
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular la diferencia de meses
  const diferenciaMeses = (fechaActual.getFullYear() - fechaSuministrada.getFullYear()) * 12 + (fechaActual.getMonth() - fechaSuministrada.getMonth());

  // Retornar el valor de la diferencia de meses
  return diferenciaMeses;
}


function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

function getDateArray(dateString) {
  const startDate = new Date(dateString);
  const currentDate = new Date();
  const startMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 15);
  const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15);

  if (startMonth < currentMonth) {
    const dateArray = [];
    let nextDate = new Date(startDate);

    while (nextDate < currentMonth) {
      nextDate.setMonth(nextDate.getMonth() + 1);
      dateArray.push(formatDate(nextDate));
    }
    return dateArray;
  } else {
    return [];
  }
}



function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}