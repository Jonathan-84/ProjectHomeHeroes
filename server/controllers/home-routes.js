const router = require('express').Router();
const sequelize = require('../config/connection');
const { Kids, Tasks, Users } = require('../models');

// on section one of Chapter 14, playing with the getting of data --- 
//only touched this page and the homepage. view


router.get('/', (req, res) => {

  Kids.findAll({
    attributes: [
      'id',
      'child_name',
      'avatar',
      'current_points',
      'users_id',
    //  [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
      // pass a single post object into the homepage template
      res.render('homepage', dbPostData[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;