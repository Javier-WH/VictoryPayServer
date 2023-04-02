


function createUpdateQueryes(list) {

    let pages = list.map(register => {
        const insertion_query = `REPLACE INTO students (name, lastName, ci, nation, seccion, grade, gender, code, birthdate, age, parents_code, tutor_code, updatedAT) ` +
        `VALUES ('${register.name}', '${register.lastName}', '${register.ci}', '${register.nation}', '${register.seccion}', '${register.grade}', '${register.gender}', '${register.code}', '${register.birthdate}', '${register.age}', '${register.parents_code}', '${register.tutor_code}', '${register.updatedAT}');  ` +
        
        `REPLACE INTO addresses (student_code, birth_country, birth_state, birth_municipio, birth_parroquia, live_state, live_municipio, live_parroquia, address, procedence_school, updatedAT)  ` +
        `VALUES ('${register.student_code}', '${register.birth_country}', '${register.birth_state}', '${register.birth_municipio}', '${register.birth_parroquia}', '${register.live_state}', '${register.live_municipio}', '${register.live_parroquia}', '${register.address}', '${register.procedence_school}', '${register.updatedAT}');  ` +
        
        `REPLACE INTO contact_infos (student_code,  phone1,  phone2, email, whatsaap1, whatsaap2, updatedAT)  ` +
        `VALUES ('${register.student_code}', '${register.phone1}', '${register.phone2}', '${register.email}', '${register.whatsaap1}',  '${register.whatsaap2}', '${register.updatedAT}');  ` +
        
        `REPLACE INTO inscription_payments (student_code, inscription, cash, operation_number, monthlyPrice, date, status, updatedAT)  ` +
        `VALUES ('${register.student_code}', '${register.inscription}',  '${register.cash}', '${register.operation_number}',  '${register.monthlyPrice}', '${register.date}', '${register.status}', '${register.updatedAT}'); ` +
        
        `REPLACE INTO medical_infos (student_code, diabetes, hipertension, dislexia, daltonismo, epilepsia, asma, alergias, TDAH, observations, updatedAT)  ` +
        `VALUES ('${register.student_code}', '${register.diabetes}', '${register.hipertension}', '${register.dislexia}', '${register.daltonismo}', '${register.epilepsia}', '${register.asma}', '${register.alergias}', '${register.TDAH}', '${register.observations}', '${register.updatedAT}'); ` +
        
        `REPLACE INTO parents  (parents_code, mother_name, mother_ci, mother_nation, mother_work, father_name, father_ci, father_nation, father_work, updatedAT)  ` +
        `VALUES ('${register.parents_code}', '${register.mother_name}', '${register.mother_ci}', '${register.mother_nation}', '${register.mother_work}', '${register.father_name}', '${register.father_ci}', '${register.father_nation}', '${register.father_work}', '${register.updatedAT}'); ` +
        
        `REPLACE INTO tutors (tutor_code, tutor_name, tutor_ci, tutor_nation, tutor_link, updatedAT)  ` +
        `VALUES ( '${register.tutor_code}', '${register.tutor_name}', '${register.tutor_ci}', '${register.tutor_nation}', '${register.tutor_link}', '${register.updatedAT}'); `

        return {insertion_query}

    })

    //console.log(pages)
    return pages;

}

module.exports = createUpdateQueryes;