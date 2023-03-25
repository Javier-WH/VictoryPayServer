const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Address extends Model{};

Address.init({
    student_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birth_country: DataTypes.STRING,
    birth_state: DataTypes.STRING,
    birth_municipio: DataTypes.STRING,
    birth_parroquia: DataTypes.STRING,
    live_state: DataTypes.STRING,
    live_municipio: DataTypes.STRING,
    live_parroquia: DataTypes.STRING,
    address: DataTypes.STRING,
    procedence_school: DataTypes.STRING,
   
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "address",
    timestamps: false
});

module.exports = Address;