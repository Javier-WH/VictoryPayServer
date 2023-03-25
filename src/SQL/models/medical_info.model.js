const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Medical_info extends Model{};

Medical_info.init({
    student_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    diabetes: DataTypes.STRING,
    hipertension: DataTypes.STRING,
    dislexia: DataTypes.STRING,
    daltonismo: DataTypes.STRING,
    epilepsia: DataTypes.STRING,
    asma: DataTypes.STRING,
    alergias: DataTypes.STRING,
    TDAH: DataTypes.STRING,
    observations: DataTypes.STRING,
   
    updatedAT: {
        type: DataTypes.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

},{
    sequelize,
    modelName: "medical_info",
    timestamps: false
});

module.exports = Medical_info;