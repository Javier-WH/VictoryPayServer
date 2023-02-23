const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Contact_info extends Model{};

Contact_info.init({
    student_id: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp1: DataTypes.STRING,
    whatsapp2: DataTypes.STRING,
   
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "contact_info",
    timestamps: false
});

module.exports = Contact_info;