const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Abono extends Model{};

Abono.init({
    tutor_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    abono: DataTypes.STRING,
   
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "abono",
    timestamps: false
});

module.exports = Abono;