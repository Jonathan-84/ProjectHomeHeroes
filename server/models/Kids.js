const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create our Post model
class Kids extends Model {

}
Kids.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        child_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         avatar: {
            type: DataTypes.STRING(75),
            allowNull: false,
         },
         current_points: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
         
/// Add way to tie kids to the specific users { still need to show this somehow}
         users_id: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'users',
                  key: 'id'
                }
            }
    },
    {
    
        sequelize,
        modelName: 'kids',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        engine: 'InnoDB' // Specify the default engine here
    
}
);
    module.exports = Kids;