const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Schools extends Model{};

Schools.init({
    school: {
        type: DataTypes.STRING,
        unique: true
    },
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "schools",
    timestamps: false
});

module.exports = Schools;