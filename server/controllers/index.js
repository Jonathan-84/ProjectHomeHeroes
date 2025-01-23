const router = require('express').Router();
const apiRoutes = require('./api');

// Use API routes with a prefix - original
// router.use('/api', apiRoutes);
//testing recommedned changes
router.use(apiRoutes);

// Fallback for 404 errors
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
