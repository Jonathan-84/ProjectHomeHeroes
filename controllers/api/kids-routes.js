const router = require('express').Router();
const { Kids, Users, Tasks } = require('../../models');

// GET /api/kids
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Kids.findAll({
      attributes: [
        'id', 
        'child_name', 
        'current_points', 
        'banked_points'
      ],
      include: [
        {
          model: Users,
          attributes: ['name']
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

// GET /api/kids/1
router.get('/:id', (req, res) => {
    Kids.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'child_name', 'current_points', 'banked_points', 'users_id'],
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

// POST /api/kids
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
    Kids.create({
      child_name: req.body.child_name,
      current_points: req.body.current_points,
      banked_points: req.body.banked_points,
      users_id: req.body.Users_id,
      tasks_id: req.body.Tasks_id
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// PUT /api/kids/1
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

// DELETE /api/kids/1
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
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;