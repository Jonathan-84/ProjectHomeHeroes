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
         date_changed: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Set default value to the current date
         },
         reward_delivered: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
         },

/// Add way to tie kids to the specific users { still need to show this somehow}
kids_id: {
   type: DataTypes.INTEGER,
   references: {
     model: 'kids',
     key: 'id'
   }
 }
    },
    {
    
        sequelize,
        modelName: 'point_history',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        engine: 'InnoDB' ,// Specify the default engine here,
        hooks: {
         beforeUpdate: (pointHistory, options) => {
           pointHistory.date_changed = new Date(); // Update date_changed to the current date
         }
       }
      
    
}
);
    module.exports = PointHistory;