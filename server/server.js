//builds but only login works

var express = require('express');
const { authMiddleware } = require("./utils/auth");
var app = express();
var path = require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers');

// const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// seems like this is biggest diffeence
// // Serve static files from the React app's build folder
// app.use(express.static(path.join(__dirname, '..', 'client/build')));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// Turn on routes mostly for API endpoints
app.use(routes);

// // Apply authMiddleware
app.use(authMiddleware);

// // Handle any requests that don’t match the ones above
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
// });

// // Turn on connection to DB and server
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