function nomlaiceInfo(Student) {
  
    if (Student.studentName != undefined) {

        let data = {
            studentName: Student.studentName,
            studentLastName: Student.studentLastName,
            studentCi: Student.studentCi,
            studentNation: Student.studentNation,
            seccion: Student.seccion,
            grade: Student.grade,
            gender: Student.gender,
            code: Student.code,
            birthDate: Student.birthDate,
            age: Student.age,
            motherName: Student.motherName,
            motherCi: Student.motherCi,
            motherNationality: Student.motherNationality,
            motherWork: Student.motherWork,
            fatherName: Student.fatherName,
            fatherCi: Student.fatherCi,
            fatherNationality: Student.fatherNationality,
            fatherWork: Student.fatherWork,
            tutorName: Student.tutorName,
            tutorCi: Student.tutorCi,
            tutorNationality: Student.tutorNationality,
            link3: Student.link3,
            birthCountry: Student.birthCountry,
            birthEstado: Student.birthEstado,
            birthMunicipio: Student.birthMunicipio,
            birthParroquia: Student.birthParroquia,
            liveEstate: Student.liveEstate,
            liveMunicipio: Student.liveMunicipio,
            liveParroquia: Student.liveParroquia,
            address: Student.address,
            procedence: Student.procedence,
            phone1: Student.phone1,
            phone2: Student.phone2,
            email: Student.email,
            whatsaap1: Student.whatsaap1,
            whatsaap2: Student.whatsaap2,
            diabetes: Student.diabetes,
            hipertension: Student.hipertension,
            dislexia: Student.dislexia,
            daltonismo: Student.daltonismo,
            epilepsia: Student.epilepsia,
            asma: Student.asma,
            alergia: Student.alergia,
            TDAH: Student.TDAH,
            observations1_4: Student.observations1_4,
            mount: Student.mount,
            payMethod: Student.payMethod,
            date: Student.date,
            account: Student.account,
            payment_status: Student.status,
            abono : Student.abono,
            monthlyPrice : Student.monthlyPrice
        }
        return data;
    }

    let data = {
        studentName: Student.name,
        studentLastName: Student.lastName,
        studentCi: Student.ci,
        studentNation: Student.nation,
        seccion: Student.seccion,
        grade: Student.grade,
        gender: Student.gender,
        code: Student.code,
        birthDate: Student.birthDate,
        age: Student.age,
        motherName: Student.mother_name,
        motherCi: Student.mother_ci,
        motherNationality: Student.mother_nation,
        motherWork: Student.mother_work,
        fatherName: Student.father_name,
        fatherCi: Student.father_ci,
        fatherNationality: Student.father_nation,
        fatherWork: Student.father_work,
        tutorName: Student.tutor_name,
        tutorCi: Student.tutor_ci,
        tutorNationality: Student.tutor_nation,
        link3: Student.tutor_link,
        birthCountry: Student.birth_country,
        birthEstado: Student.birth_state,
        birthMunicipio: Student.birth_municipio,
        birthParroquia: Student.birth_parroquia,
        liveEstate: Student.live_state,
        liveMunicipio: Student.live_municipio,
        liveParroquia: Student.live_parroquia,
        address: Student.address,
        procedence: Student.procedence_school,
        phone1: Student.phone1,
        phone2: Student.phone2,
        email: Student.email,
        whatsaap1: Student.whatsaap1,
        whatsaap2: Student.whatsaap2,
        diabetes: Student.diabetes,
        hipertension: Student.hipertension,
        dislexia: Student.dislexia,
        daltonismo: Student.daltonismo,
        epilepsia: Student.epilepsia,
        asma: Student.asma,
        alergia: Student.alergias,
        TDAH: Student.TDAH,
        observations1_4: Student.observations,
        mount: Student.inscription,
        payMethod: Student.cash == "true" ? "2" : "1",
        date: Student.date,
        account: Student.operation_number,
        payment_status: Student.status,
        abono : Student.abono,
        monthlyPrice : Student.monthlyPrice
        
    }

    return data;
}

module.exports = nomlaiceInfo;