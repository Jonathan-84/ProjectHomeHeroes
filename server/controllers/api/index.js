const router = require('express').Router();
const penaltiesRoutes= require('./penalties-routes.js');
const usersRoutes = require('./users-routes.js');
const tasksRoutes = require('./tasks-routes.js');
const kidsRoutes= require('./kids-routes.js');
const rewardsRoutes= require('./rewards-routes.js');
const pointHistoryRoutes= require('./pointhistory-routes.js');

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);
router.use('/kids', kidsRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/point-history', pointHistoryRoutes);
router.use('/penalties', penaltiesRoutes);




module.exports = router;