const { Model, DataTypes } = require('sequelize');
//may need to address address based on final folder architecture
const sequelize = require('../config/connection');
//install hashng for passwords
const bcrypt = require('bcrypt');

class Users extends Model {
    checkPassword(loginPw) {
      if (!this.password) {
        throw new Error('Password hash is undefined');
      }
      return bcrypt.compareSync(loginPw, this.password);
    }
  
    // checkResetCode(resetCode) {
    //   if (!this.reset_code) {
    //     throw new Error('Reset code hash is undefined');
    //   }
    //   return bcrypt.compareSync(resetCode, this.reset_code);
    // }
  }
  
Users.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
     },
     email: {
         type:DataTypes.STRING(30),
         allowNull: false, 
         unique: true,
         validate: {
             isEmail: true
         }
        },
    password: {
        type: DataTypes.STRING(75),
        allowNull: false, 
        validate: {
            //means password must be at least 4 characters long
            len: [4,30]
        }
    },
    reset_hint: {
        type:DataTypes.STRING(30),
        allowNull: false, 
       },

       reset_code: {
        type: DataTypes.STRING(75),
        allowNull: false, 
    },

},
{
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            newUserData.reset_code = await bcrypt.hash(newUserData.reset_code, 10);
            return newUserData;
    },
    // set up beforeUpdate lifecycle "hook" functionality
  async beforeUpdate(updatedUserData) {
    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    updatedUserData.reset_code = await bcrypt.hash(updatedUserData.reset_code, 10);
    return updatedUserData;
  }
},

    sequelize,
    modelName: 'users',
    timestamps: false,
    paranoid: false,
    freezeTableName:true,
    underscored: true
}
);
module.exports = Users;