const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Register extends Model{}

Register.init({
 
    register_code: DataTypes.STRING, /*{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },*/
    user: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    insertion_query: DataTypes.TEXT,
    rollback_query: DataTypes.TEXT,
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal("DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s')")
      }
},{
    sequelize,
    modelName: "register",
    timestamps: false
});

module.exports = Register;