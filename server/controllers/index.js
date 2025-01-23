const router = require('express').Router();
const apiRoutes = require('./api');

// Use API routes with a prefix
router.use('/api/*', apiRoutes);

// Fallback for 404 errors
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
