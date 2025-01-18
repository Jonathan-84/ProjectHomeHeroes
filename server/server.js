//builds but only login works

const express = require('express');
const path = require('path');
const { authMiddleware } = require("./utils/auth");
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Apply authMiddleware for all /api routes
app.use('./api', authMiddleware);

app.use(express.json());
// different than the other project
app.use(express.urlencoded({ extended: true }));
//different than other
// app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Handle any requests that don’t match the above routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Turn on routes for API endpoints
app.use('./api', routes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});


// works,  locally only
// var express = require('express');
// const { authMiddleware } = require("./utils/auth");

// var app = express();
// var path = require('path');
// const sequelize = require('./config/connection');
// const routes = require('./controllers');

// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // turn on routes
// app.use(routes);

// app.use( authMiddleware);

// // turn on connection to db and server
// sequelize.sync({ alter: true  }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });