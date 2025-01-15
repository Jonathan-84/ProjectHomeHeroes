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

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle any requests that don’t match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Turn on routes mostly for API endpoints
app.use(routes);

// Apply authMiddleware
app.use(authMiddleware);

// Turn on connection to DB and server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
