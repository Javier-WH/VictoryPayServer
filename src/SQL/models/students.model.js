const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");

class Students extends Model{};

Students.init({
    name : DataTypes.STRING,
    lastName : DataTypes.STRING,
    ci:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nation : DataTypes.STRING,
    seccion : DataTypes.STRING,
    grade : DataTypes.STRING,
    gender : DataTypes.STRING,
    code : DataTypes.STRING,
    birthdate : DataTypes.STRING,
    age : DataTypes.STRING,
    parent_id : DataTypes.STRING,
    tutor_id : DataTypes.STRING,
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "students",
    timestamps: false
});

module.exports = Students;