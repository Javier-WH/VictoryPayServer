const { Model, DataTypes, Sequelize } = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Monthly_payment extends Model { };

Monthly_payment.init({
    student_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    last_payment: DataTypes.STRING,
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

}, {
    sequelize,
    modelName: "monthly_payment",
    timestamps: false
});

module.exports = Monthly_payment;