// //works with localhost 3000 so far

// const express = require('express');
// const { authMiddleware } = require("./utils/auth");
// const path = require('path');
// const sequelize = require('./config/connection');
// const apiRoutes = require('./controllers/index.js');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Turn on auth middleware (apply after defining API routes)
// app.use(authMiddleware);

// // Use API routes with a prefix
// app.use(apiRoutes);

// // // Turn on auth middleware (apply after defining API routes)
// // app.use(authMiddleware);

// // // Turn on auth middleware (apply after defining API routes)
// // app.use(authMiddleware);

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../client/build')));

// // Catch-all handler to serve React app for non-API routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// // Health check endpoint
// app.get("/health", (req, res) => {
//     res.status(200).send("Server is healthy!");
// });

// // Turn on connection to DB and server
// sequelize.sync({ alter: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening on port ' + PORT));
// });

const express = require('express');
const { authMiddleware } = require("./utils/auth");
const path = require('path');
const sequelize = require('./config/connection');
const apiRoutes = require('./controllers/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on auth middleware (apply after defining API routes)
app.use(authMiddleware);

// Use API routes with a prefix
// app.use('/api', apiRoutes);  // Make sure to use the /api prefix
app.use( apiRoutes);  // Make sure to use the /api prefix

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all handler to serve React app for non-API routes
app.get('*', (req, res) => {
    if (!req.originalUrl.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    } else {
        res.status(404).send("Not found");
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy!");
});

// Turn on connection to DB and server
sequelize.sync({ alter: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});

