const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Conflicts extends Model{}

Conflicts.init({
    link: DataTypes.STRING,
    type: DataTypes.STRING,
    data: DataTypes.JSON,
    selected: DataTypes.BOOLEAN,
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "conflicts",
    timestamps: false
});

module.exports = Conflicts;