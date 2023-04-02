const Joi = require("joi");
const {getAbonosListPage} = require("../controllers/abono.controller");




async function getAbonoPage(req, res){

    const schema = Joi.object({
        page: Joi.number().min(1).required(),
        date: Joi.date().required()
    }).messages({
        'array.base': 'Los datos enviados no son correctos',
        'array.min': 'No ha suministrado ningun dato'
    });

    const { error, value: data } = schema.validate(req.body);
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
    }

    const {page, date } = req.body;

    try {
        const abonoPage = await getAbonosListPage(date, page);
        res.status(200).json(abonoPage);

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "ocurrio un problema al intentar obtener la pagina de datos"});
    }

}

module.exports = getAbonoPage;