const router = require('express').Router();
const { Kids, Users, Tasks } = require('../../models');
const { authToken } = require('../../utils/auth');

// GET ALL /api/brypts
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Kids.findAll({
      attributes: [
        'id', 
        'avatar',
        'child_name', 
        'current_points'
     
      ],
      include: [
        {
          model: Users,
          attributes: ['name', 'id']
        },
        {
          model: Tasks,
          attributes: ['task_name']
        }
      ]
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET One brypt  /api/brypts/1
router.get('/users/:userId/:id', (req, res) => {
    Kids.findOne({
      where: {
        id: req.params.id,
        users_id: req.params.userId
      },
      attributes: ['id','child_name', 'avatar', 'current_points', 'users_id'],
      include: [
        {
          model: Users,
          attributes: ['name']
        },
        {
                model: Tasks,
                attributes: ['task_name']
              },
      ]

    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
      });

// GET ALL bryptS by users /api/brypts/1
router.get('/users/:userId', (req, res) => {
 Kids.findAll({
    where: {
      // id: req.params.id,
      users_id: req.params.userId
    },
    attributes: ['id','child_name', 'avatar', 'current_points', 'users_id'],
    include: [
      {
        model: Users,
        attributes: ['name']
      },
      {
              model: Tasks,
              attributes: ['task_name']
            },
    ]

  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
    });     

// POST /api/brypts
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
    Kids.create({
      child_name: req.body.child_name,
      avatar: req.body.avatar,
      current_points: req.body.current_points,
      users_id: req.body.users_id,
      // tasks_id: req.body.tasks_id
    })
      .then(dbUserData => {
        res.json(dbUserData)})
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// PUT /api/brypts/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role: 'Uncle'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Kids.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/brypts/1
router.delete('/:id', (req, res) => {
    Kids.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.status(200).json({ message: 'Child has been removed from list'});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;