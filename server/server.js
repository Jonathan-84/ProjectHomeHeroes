// //this doesn't server up react componently correctly
// //but the backend behaves correctly

// var express = require('express');
// // const { authMiddleware } = require("./utils/auth");
// var app = express();
// var path = require('path');
// const sequelize = require('./config/connection');
// const routes = require('./controllers');

// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../client/build')));



// // // Apply authMiddleware
// // app.use(authMiddleware);



// // app.get('', (req, res) => {
// //   res.json({ message: 'Hello from the server!' });
// // });


// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// // Turn on routes mostly for API endpoints
// app.use(routes);

// app.get("/health", (req, res) => {
//   res.status(200).send("Server is healthy!");
// });


// // // Turn on connection to DB and server
// sequelize.sync({ alter: false }).then(() => {
//   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// });

// works, including locally ---
// var express = require('express');
// const { authMiddleware } = require("./utils/auth");

// var app = express();
// var path = require('path');
// const sequelize = require('./config/connection');
// const routes = require('./controllers');

// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../client/public')));

// // turn on routes
// app.use(routes);

// app.use( authMiddleware);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// // turn on connection to db and server
// sequelize.sync({ alter: false  }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

// tests below
var express = require('express');
const { authMiddleware } = require("./utils/auth");
var path = require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// turn on routes
app.use(routes);

app.use(authMiddleware);

// API routes
app.get('*/*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  if (isProd || req.headers['x-local-dev']) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  } else {
    res.status(404).send('Not found');
  }
});

// turn on connection to db and server
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
