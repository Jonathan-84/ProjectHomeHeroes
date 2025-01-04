const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Tasks model
class Tasks extends Model {

}
Tasks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        task_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         task_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },

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
        modelName: 'tasks',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        engine: 'InnoDB' // Specify the default engine here
    
}
);
    module.exports = Tasks;