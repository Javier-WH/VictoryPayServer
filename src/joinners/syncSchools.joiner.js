const { getSchoolsList, addSchool } = require("../controllers/schools.controler")
const Joi = require("joi")
const sequelize = require("../SQL/Sequelize/connection");


async function syncSchools(req, res) {

    list = req.body;
    const transaction = await sequelize.transaction();
    try {
        const schema = Joi.object({
            list: Joi.array().min(1).required()
        });

        const { error, value: data } = schema.validate({ list });

        if (error) {
            console.log(error.details[0].message)
            return res.status(400).json({ error: error.details[0].message });
        }


        


        for (school of list) {
            await addSchool(school, transaction);
        }

        const schoolsList = await getSchoolsList();

        await transaction.commit()
        res.status(200).json(schoolsList)
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({ error: "Ocurrió un error al intentar actualizar la lista de colegios" })
    }


}


module.exports = syncSchools;