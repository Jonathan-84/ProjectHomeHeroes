const router = require('express').Router();

const usersRoutes = require('./users-routes.js');
const tasksRoutes = require('./tasks-routes.js');
const kidsRoutes= require('./kids-routes');
const rewardsRoutes= require('./rewards-routes');
const redemptionsRoutes= require('./redemptions-routes');

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);
router.use('/kids', kidsRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/redemptions', redemptionsRoutes);


module.exports = router;