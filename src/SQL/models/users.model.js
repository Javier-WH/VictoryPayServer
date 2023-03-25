const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Users extends Model{};

Users.init({
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    ci:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "users",
    timestamps: false
});

module.exports = Users;
