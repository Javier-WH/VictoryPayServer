const express = require("express");
const Router = express.Router();
const registerStudent = require("../../joinners/registerStudent.joinner");
const resolveInsertion = require("../../joinners/resolveInsertionConflict");



Router.post("/addStudent", express.json(), registerStudent);

Router.post("/resolveInsertion", express.json(), resolveInsertion);

module.exports = Router;

    //console.log(req.body);
   
    /*
    if(req.body.force == undefined){
        console.log(req.body)
        res.status(200).json({
            CONFLICT : "1",
            name1 : `${req.body.studentName}  ${req.body.studentLastName}`,
            ci1 : req.body.studentCi,
            id1 : 5,
            name2 : "Simon Bolivar",
            ci2 :  req.body.studentCi,
            id2 : 5,
            problem:"Ambos tienen la misma cédula"
        });
    }else{
        res.status(200).json(
            {
                date: '8 / 1 / 2021', 
                fatherName: 'Antonio Jose de Suicre',    
                hipertension: 'false',
                motherCi: '123',      
                fatherWork: '123',
                phone2: '123',
                phone1: '123',
                procedence: '123',
                tutorSelected: '1',
                payMethod: '2',
                birthParroquia: 'Altagracia de Orituco',
                birthCountry: 'Venezuela',
                w1: 'false',
                birthMunicipio: 'Monagas',
                tutorNationality: 'V-',
                w2: 'false',
                motherNationality: 'V-',
                liveMunicipio: 'Monagas',
                motherName: '123',
                studentNation: 'V-',
                daltonismo: 'false',
                tutorCi: '123',
                fatherCi: '1231',
                mount: '123',
                liveEstate: 'Guárico',
                TDAH: 'false',
                studentName: 'Simon Jose Antonio de la Santisima Trinidad',
                grade: '1er año',
                motherWork: '13',
                observations1_4: '',
                code: 'I1-2965673308',
                gender: 'Masculino',
                liveParroquia: 'Altagracia de Orituco',
                link3: 'Es la Madre',
                email: '123',
                studentLastName: 'Bolivar y Palacios, Ponte y Blanco',
                address: '123',
                spinerIndex: '0XXX10XXX7XXX0XXX10XXX7XXX0',
                studentCi: '888899',
                whatsaap1: 'No suministrado',
                dislexia: 'false',
                asma: 'false',
                alergia: 'false',
                whatsaap2: 'No suministrado',
                birthDate: '20 / 1 / 2004',
                seccion: '-',
                tutorName: '123',
                epilepsia: 'false',
                fatherNationality: 'V-',
                birthEstado: 'Guárico',
                diabetes: 'false',
                age: '18 años',
                account: '123'
        });
        console.log(req.body.force)
    }
  */