const Users = require("./Users");
const Kids = require("./Kids");
const Tasks = require("./Tasks");

//Kids routes are all good
  Kids.belongsTo(Users, {
    foreignKey: "users_id",
  });

 Kids.hasMany(Tasks, {
    foreignKey: "kids_id",
  });

  Users.hasMany(Kids, {
    foreignKey: "users_id",
    onDelete: "cascade",
  });
/*
  Users.hasMany(Tasks, {
    through: Kids,
    foreignKey: "users_id"
  })
*/
  Tasks.belongsTo(Kids, {
    foreignKey: "kids_id"
  });
/*
 Tasks.belongsToMany(Users, {
    through: Kids,
  foreignKey: 'kids_id'
  });*/

module.exports = { Users, Kids, Tasks };