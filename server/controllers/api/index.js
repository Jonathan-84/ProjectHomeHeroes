const router = require('express').Router();

const usersRoutes = require('./users-routes.js');
const tasksRoutes = require('./tasks-routes.js');
const kidsRoutes= require('./kids-routes.js');
const rewardsRoutes= require('./rewards-routes.js');
const redemptionsRoutes= require('./redemptions-routes.js');

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);
router.use('/kids', kidsRoutes);
router.use('/rewards', rewardsRoutes);
router.use('/redemptions', redemptionsRoutes);




module.exports = router;