const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Register extends Model{}

Register.init({
    code: DataTypes.STRING,
    user: DataTypes.STRING,
    pivot: DataTypes.STRING,
    type: DataTypes.STRING,
    insertQuery: DataTypes.TEXT,
    rollbackQuery: DataTypes.TEXT,
},{
    sequelize,
    modelName: "register",
    timestamps: false
});

module.exports = Register;