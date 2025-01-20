const router = require('express').Router();

const apiRoutes = require('./api');

// const homeRoutes = require('./home-routes');

// router.use('/', homeRoutes);

router.use('/api', apiRoutes);

// Define the /login route in index.js if it's not included elsewhere 
router.get('/login', (req, res) => 
  { res.sendFile(path.join(__dirname, "../client/build/index.html")); });

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;