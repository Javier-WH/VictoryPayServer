const {Model, DataTypes, Sequelize} = require("@sequelize/core");
const sequelize = require("../Sequelize/connection");


class Prices extends Model{};

Prices.init({
    item: DataTypes.STRING,
    price: DataTypes.STRING,  
    updatedAt:{
        type: 'TEXT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    sequelize,
    modelName: "prices",
    timestamps: false
});

module.exports = Prices;