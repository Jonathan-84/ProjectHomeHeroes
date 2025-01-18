//this doesn't server up react componently correctly
//but the backend behaves correctly

var express = require('express');
const { authMiddleware } = require("./utils/auth");
var app = express();
var path = require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// // Apply authMiddleware
app.use(authMiddleware);
// Turn on routes mostly for API endpoints
app.use(routes);

// Serve React frontend 
// app.use((req, res) => 
//   { res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
//   });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// // Turn on connection to DB and server
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

// works, including locally
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