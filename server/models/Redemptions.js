const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create our Post model
class Redemptions extends Model {

}
Redemptions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        reward_redeemed: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         kids_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
         },
         date_reedemed: {
            type: DataTypes.DATEONLY,
            allowNull: false,
         },
         delivered: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
         },

/// Add way to tie kids to the specific users { still need to show this somehow}

    },
    {
    
        sequelize,
        modelName: 'redemptions',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        engine: 'InnoDB' // Specify the default engine here
    
}
);
    module.exports = Redemptions;