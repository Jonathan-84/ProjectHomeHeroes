const router = require('express').Router();
const sequelize = require('../config/connection');
const { Kids, Tasks, Users } = require('../models');

// on section one of Chapter 14, playing with the getting of data --- 
//only touched this page and the homepage. view
router.get('/', (req, res) => {
  res.render('homepage', {
    id: 1,
    post_url: 'http://localhost:3001/api/kids',
    title: 'Kids',
    child_name: "",
    current_points: "",
    banked_points: "",
    tasks: [{}, {}],
    user: {
      name: ""
    }
  });
});

module.exports = router;