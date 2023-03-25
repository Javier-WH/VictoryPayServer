const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Tutors extends Model{};

Tutors.init({
    tutor_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tutor_name: DataTypes.STRING,
    tutor_ci:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tutor_nation: DataTypes.STRING,
    tutor_link: DataTypes.STRING,
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "tutors",
    timestamps: false
});

module.exports = Tutors;