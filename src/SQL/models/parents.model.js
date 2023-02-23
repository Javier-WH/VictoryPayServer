const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Parents extends Model{};

Parents.init({
    mother_name: DataTypes.STRING,
    mother_ci:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mother_nation: DataTypes.STRING,
    mother_work: DataTypes.STRING,
    father_name: DataTypes.STRING,
    father_ci:{
        type: DataTypes.STRING,
        allowNull: false
    },
    father_nation: DataTypes.STRING,
    father_work: DataTypes.STRING,
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "parents",
    timestamps: false
});

module.exports = Parents;