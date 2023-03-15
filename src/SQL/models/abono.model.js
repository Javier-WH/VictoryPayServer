const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Abono extends Model{};

Abono.init({
    tutor_id: DataTypes.STRING,
    abono: DataTypes.STRING,
   
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "abono",
    timestamps: false
});

module.exports = Abono;