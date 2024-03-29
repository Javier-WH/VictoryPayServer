const { Model, DataTypes, Sequelize } = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");

class Students extends Model { };

Students.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    ci: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nation: DataTypes.STRING,
    seccion: DataTypes.STRING,
    grade: DataTypes.STRING,
    gender: DataTypes.STRING,
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthdate: DataTypes.STRING,
    age: DataTypes.STRING,
    parent_code: DataTypes.STRING,
    tutor_code: DataTypes.STRING,
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }


}, {
    sequelize,
    modelName: "students",
    timestamps: false
});

module.exports = Students;