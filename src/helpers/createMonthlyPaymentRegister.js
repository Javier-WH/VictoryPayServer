const { getMontlyPaymentsInfo } = require("../controllers/monthlyPayment.controller")



async function createMonthlyPaymentRegister(register) {

  const { student_code, months, updatedAT } = register;

  //obtiene la información de los meses pagados por el estudiante
  const monthly_payment_info = await getMontlyPaymentsInfo(student_code);


  //obtiene el ultimo pago realizado
  const last_PaymentDone = monthly_payment_info?.last_payment ?? getOctoberDate();


  //lista de meses que se deben
  const pending_payments = getDateArray(last_PaymentDone)


  //si se pagan mas meses que los meses que se deben
  if (months > pending_payments.length) {
    //se calcula la diferencia entre los meses que se deben y los meses que se pagan
    let diferenceMonths = months - pending_payments.length;

    if (diferenceMonths == 1) {
      diferenceMonths = Number.parseInt(months)
    }

    //a la fecha actual se le suma la difetencia de meses
    let currentDate = new Date(last_PaymentDone);

    currentDate.setMonth(currentDate.getMonth() + diferenceMonths);
    last_payment = formatDate(currentDate);

    //si se deben mas meses de los que se pagan
  } else if (pending_payments.length > months) {

    //se eliminan los meses mas viejos
    for (let i = 0; i < months - 1; i++) {
      pending_payments.shift();
    }
    //se obtiene la fecha mas vieja que queda
    last_payment = pending_payments[0]

    //la ultima opcion, que sean iguales
  } else {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth());
    last_payment = formatDate(currentDate)
  }


  insertion_query = `INSERT INTO monthly_payments (student_code, last_payment, updatedAT) VALUES ('${student_code}', '${last_payment}', '${updatedAT}') ` +
    `ON DUPLICATE KEY UPDATE last_payment = '${last_payment}', updatedAT = '${updatedAT}'; `;


  rollback_query = `UPDATE monthly_payments SET last_payment = '${last_PaymentDone}', updatedAT = '${updatedAT}' WHERE student_code = '${student_code}'; `



  return {
    insertion_query,
    rollback_query
  }
}


module.exports = createMonthlyPaymentRegister;



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

  if (startMonth <= currentMonth) {
    const dateArray = [];
    let nextDate = new Date(startDate);

    while (nextDate <= currentMonth) {
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


function getOctoberDate() {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  if (today.getMonth() >= 9) {
    // Si ya pasó octubre de este año
    const octoberFirst = new Date(currentYear, 9, 1); // 9 = octubre (los meses empiezan en 0)
    return formatDate(octoberFirst)
  } else {
    // Si todavía no ha pasado octubre de este año
    const lastYear = currentYear - 1;
    const octoberFirst = new Date(lastYear, 9, 1); // 9 = octubre (los meses empiezan en 0)
    return formatDate(octoberFirst)
  }
}