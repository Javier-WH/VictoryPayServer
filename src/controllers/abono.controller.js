const Abono = require("../SQL/models/abono.model");
const sequelize = require("../SQL/Sequelize/connection");

async function getAbono(tutor_id) {

    try {
        let ask = await Abono.findAll({
            attributes: { include: [[sequelize.col('updatedAt'), 'abonoDate']] },
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