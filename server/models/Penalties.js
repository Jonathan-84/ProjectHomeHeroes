const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create our Post model
class Penalties extends Model {

}
Penalties.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        penalty_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         penalty_description: {
            type: DataTypes.STRING(60),
            allowNull: false,
         },
         penalty_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'rewards',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        engine: 'InnoDB' // Specify the default engine here
    
}
);
    module.exports = Penalties;