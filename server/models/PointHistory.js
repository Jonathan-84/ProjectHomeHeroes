const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create our Post model
class PointHistory extends Model {

}
PointHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        change_category: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         change_details: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         kids_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         date_changed: {
            type: DataTypes.DATEONLY,
            allowNull: false,
         },
         reward_delivered: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
         },

/// Add way to tie kids to the specific users { still need to show this somehow}

    },
    {
    
        sequelize,
        modelName: 'point_history',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        engine: 'InnoDB' // Specify the default engine here
    
}
);
    module.exports = PointHistory;