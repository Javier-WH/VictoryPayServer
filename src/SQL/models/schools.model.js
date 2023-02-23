const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Schools extends Model{};

Schools.init({
    school: DataTypes.STRING,
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "schools",
    timestamps: false
});

module.exports = Schools;