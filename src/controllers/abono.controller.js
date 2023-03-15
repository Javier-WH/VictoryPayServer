const Abono = require("../SQL/models/abono.model");

async function getAbono(tutor_id) {

    try {
        let ask = await Abono.findAll({
            where: {
                tutor_id
            }
        });

        if (ask.length > 0) {
            return ask[0].dataValues
        }

        return null;


    } catch (error) {
        console.log(error)
    }

}

module.exports = {getAbono};