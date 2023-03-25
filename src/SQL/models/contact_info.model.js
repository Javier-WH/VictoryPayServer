const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Contact_info extends Model{};

Contact_info.init({
    student_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsaap1: DataTypes.STRING,
    whatsaap2: DataTypes.STRING,
   
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "contact_info",
    timestamps: false
});

module.exports = Contact_info;