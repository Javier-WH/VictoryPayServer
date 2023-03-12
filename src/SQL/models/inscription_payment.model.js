const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Inscription_payment extends Model{};

Inscription_payment.init({
    student_id: DataTypes.STRING,
    inscription: DataTypes.STRING,
    cash: DataTypes.STRING,
    operation_number: DataTypes.STRING,
    date: DataTypes.STRING,
    status: DataTypes.STRING,
   
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "inscription_payment",
    timestamps: false
});

module.exports = Inscription_payment;