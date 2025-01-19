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
app.use(express.static(path.join(__dirname, '../client/build')));

// turn on routes
app.use(routes);

app.use(authMiddleware);

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
