const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Tutors extends Model{};

Tutors.init({
    tutor_name: DataTypes.STRING,
    tutor_ci:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tutor_nation: DataTypes.STRING,
    tutor_link: DataTypes.STRING,

    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "tutors",
    timestamps: false
});

module.exports = Tutors;