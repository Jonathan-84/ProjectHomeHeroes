const router = require('express').Router();

const usersRoutes = require('./users-routes.js');
const tasksRoutes = require('./tasks-routes.js');
const kidsRoutes= require('./kids-routes');

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);
router.use('/kids', kidsRoutes);


module.exports = router;