const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Inscription_payment extends Model{};

Inscription_payment.init({
    student_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    inscription: DataTypes.STRING,
    cash: DataTypes.STRING,
    operation_number: DataTypes.STRING,
    monthlyPrice: DataTypes.STRING,
    date: DataTypes.STRING,
    status: DataTypes.STRING,
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "inscription_payment",
    timestamps: false
});

module.exports = Inscription_payment;