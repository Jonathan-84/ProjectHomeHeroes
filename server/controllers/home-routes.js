// 

const router = require('express').Router();
const { Users } = require('../models');

// Define the /login route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
