const { getStudentList } = require("../controllers/student.controller");


async function SyncStudents(req, res) {
    //los alumnos enviados
    let commingData = req.body.datos;
    //si no envia los datos
    if (commingData == undefined) {
        res.status(400).json({ ERROR: "dastos desconocidos" });
        return;
    }

    //obtiene los alumnos almacenados en el servidor
    let storedData = await getStudentList();

    //une en una lista los alumnos enviados con los almacenados en el servidor
    let condensedData = storedData.concat(commingData);

    //obtiene los códigos repetidos
    let duplicateCodes = [];
    condensedData.forEach((student1, index1) => {
        let matches = 0;
        let code1 = student1.code;

        condensedData.forEach((student2, index2) => {
            let code2 = student2.code;
            if (code1 == code2) {
                matches++;
                if (matches == 2 && index1 != index2) {
                    duplicateCodes.push({
                        index1,
                        index2
                    });
                }
            }
        });
    });


    //elimina los codigos repetidos en base a la fecha de almacenado.
    let removedItems = [];
    duplicateCodes.forEach(duplicate => {
        let { index1, index2 } = duplicate;
        let student1 = condensedData[index1];
        let student2 = condensedData[index2];
        let date1 = new Date(student1.updatedAt);
        let date2 = new Date(student2.updatedAt);
        
        if(date1.getTime() == date2.getTime()){ // si las fechas son iguales, solo deja uno
            removedItems = condensedData.splice(index2, index2);
        }
        else if (date1.getTime() > date2.getTime()) { // si la fecha del primero es mayor, elimina al segundo
            removedItems = condensedData.splice(index2, index2);
        } else { // de lo contrario elimina al primero
            removedItems = condensedData.splice(index1, index1);
        }
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////




    console.log(condensedData);




    //console.log(storedData)
    //console.log(commingData);
    res.status(200).json({ message: "OK" })

}

module.exports = SyncStudents;

//mes/dia/year

/* 
{
  datos: [
    {
      lastName: 'XXX',
      seccion: '-',
      tutor_id: '1',
      code: 'N1-715153560',      
      birthdate: '30 / 1 / 2004',
      gender: 'Masculino',       
      nation: 'V-',
      ci: '123',
      parent_id: '1',
      grade: '1er año',
      name: 'XXX',
      age: '18 años',
      updatedAT: "21/1/2022"
    },
    {
      lastName: '324324',
      seccion: '-',
      tutor_id: '2',
      code: 'N1-427072961',
      birthdate: '21 / 1 / 2004',
      gender: 'Masculino',
      nation: 'V-',
      ci: '324324324',
      parent_id: '2',
      grade: '1er año',
      name: '43242',
      age: '18 años',
      updatedAT: "21/1/2025"
    }
  ]
}




    let date1 = new Date("01/02/2022");
    let date2 = new Date("01/01/2022");

    if (date1.getTime() > date2.getTime()) {
        console.log("date1 es mayor");
    } else {
        console.log("date2 es mayor");
    }

*/