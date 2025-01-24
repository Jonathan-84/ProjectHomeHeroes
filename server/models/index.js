const Users = require("./Users");
const Kids = require("./Kids");
const Tasks = require("./Tasks");
const Rewards = require("./Rewards");
const Penalties = require("./Penalties");
const PointHistory = require("./PointHistory");


//Kids routes are all good
  Kids.belongsTo(Users, {
    foreignKey: "users_id",
  });

  Rewards.belongsTo(Users, {
    foreignKey: "users_id",
  });

  Penalties.belongsTo(Users, {
    foreignKey: "users_id",
  });

 Kids.hasMany(Tasks, {
    foreignKey: "kids_id",
  });
  Kids.hasOne(PointHistory, {
    foreignKey: "kids_id",
  });

  Users.hasMany(Rewards, {
    foreignKey: "users_id",
    onDelete: "cascade",
  });

  Users.hasMany(Penalties, {
    foreignKey: "users_id",
    onDelete: "cascade",
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

  PointHistory.belongsTo(Kids, {
    foreignKey: "kids_id"
  });
/*
 Tasks.belongsToMany(Users, {
    through: Kids,
  foreignKey: 'kids_id'
  });*/

module.exports = { Users, Kids, Tasks, Rewards, Penalties };