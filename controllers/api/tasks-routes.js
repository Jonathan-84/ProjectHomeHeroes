const router = require('express').Router();
const { Users, Kids, Tasks} = require('../../models');

// GET /api/tasks
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Tasks.findAll({
      attributes: [
        'id', 
        'task_name', 
        'task_points',
        'kids_id' 
      ],
      include: [
        {
          model: Kids,
          attributes: ['child_name']
        }
      ]
    }    
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/tasks/1
router.get('/:id', (req, res) => {
    Tasks.findOne({
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
      })
      });

// POST /api/tasks
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
    Tasks.create({
      task_name: req.body.task_name,
      task_points: req.body.task_points,
      Users_id: req.body.Users_id,
      Kids_id: req.body.Kids_id
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// PUT /api/tasks/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role: 'Uncle'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Tasks.update(req.body, {
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

// DELETE /api/tasks/1
router.delete('/:id', (req, res) => {
    Tasks.destroy({
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