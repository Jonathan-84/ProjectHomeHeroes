const router = require('express').Router();
const path = require('path');
const { Kids, Tasks, Users } = require('../models');

// Define the /login route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Define other routes
router.get('/', (req, res) => {
  Kids.findAll({
    attributes: [
      'id',
      'child_name',
      'avatar',
      'current_points',
      'users_id',
    ],
    include: [
      {
        model: Tasks,
        attributes: ['id', 'task_name', 'task_points', 'kids_id'],
      },
      {
        model: Users,
        attributes: ['name', 'id']
      }
    ]
  })
    .then(dbPostData => {
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
