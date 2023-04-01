const { getAbono } = require("../controllers/abono.controller")

async function createIinscriptionPaymentRegister(incomingRegister) {

  try {

    const { student_code, money: inscription, cash, operation_number, monthlyPrice, date, updatedAT, tutor_code } = incomingRegister.metadata;

    const storedAbono = await getAbono(tutor_code); // obtener la cantidad guardada de dinero

    const totalMoney = Number.parseFloat(storedAbono) + Number.parseFloat(inscription) - Number.parseFloat(monthlyPrice); // sumar la cantidad guardada con la variable inscription y restar monthlyPrice

    const sufficientMoney = totalMoney >= 0; // verificar si la cantidad resultante es suficiente para pagar la mensualidad

    const abonoDifference = storedAbono - totalMoney; // calcular la diferencia del abono

    const sing = abonoDifference > 0 ? "+" : "-";

    const payment = sufficientMoney ? monthlyPrice : "0";

    const newAbono = sufficientMoney ? totalMoney : storedAbono + Number.parseFloat(inscription); // calcular el nuevo abono

    let insertion_query = `REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT) 
      VALUES ('${student_code}', '${payment}', '${cash}', '${operation_number}', '${monthlyPrice}', '${date}', '${sufficientMoney}', '${updatedAT}' ); 
      REPLACE INTO abonos (tutor_code, abono, updatedAT) 
      VALUES ('${tutor_code}', '${newAbono}' , '${updatedAT}');`;

    let rollback_query = `DELETE FROM inscription_payments WHERE student_code = '${student_code}' ; UPDATE abonos SET abono = abono ${sing} ${newAbono}  WHERE tutor_code = '${tutor_code}';`

    return {
      register_code : incomingRegister.register_code,
      user  : incomingRegister.user ,
      description: "Pago de inscripción de estudiante",
      date: "03/29/2023 09:03:25",
      type : incomingRegister.type,
      metadata: {
        student_code,
        inscription,
        cash,
        operation_number,
        monthlyPrice,
        date,
        status: sufficientMoney,
        updatedAT,
        tutor_code
      },
      insertion_query,
      rollback_query
    }
  } catch (error) {
    console.log(error)
  }

}

module.exports = createIinscriptionPaymentRegister;


/*
{
  "register_code": "R-032923-523533656",
  "user": "16193765",
  "description": "Pago de inscripción de estudiante",
  "date": "03/29/2023 09:03:25",
  "type": "2",
  "metadata": {
    "student_code": "N1-826015620",
    "inscription": "120.0",
    "cash": "1",
    "operation_number": "",
    "monthlyPrice": "100.0",
    "date": "Selecciona una fecha",
    "status": "true",
    "updatedAT": "03/29/2023 09:03:25",
    "tutor_code": "T-032923-030944788"
  },
  "insertion_query": "REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT) VALUES ('N1-826015620', '100.0', '1', '', '100.0', 'Selecciona una fecha', 'true', '03/29/2023 09:03:25' ); REPLACE INTO abonos (tutor_code, abono, updatedAT) VALUES ('-1', '20.0' , '03/29/2023 09:03:25');",
  "rollback_query": "DELETE FROM inscription_payments WHERE student_code = 'N1-826015620' ; UPDATE abonos SET abono = abono - 20.0  WHERE tutor_code = '-1';"
}



*/