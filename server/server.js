//builds but only login works

const express = require('express');
const path = require('path');
const { authMiddleware } = require("./utils/auth");
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply authMiddleware for API routes
app.use('./api', authMiddleware);

// Turn on API routes
app.use('./api', routes);

// Serve static files from the React app's build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Catch-all route to serve React's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// Catch-all route for development (non-API requests)
app.get('*', (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    res.send('API is running...');
  } else {
    next();
  }
});

// Turn on connection to DB and server
sequelize.sync({ alter: true }).then(() => {
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