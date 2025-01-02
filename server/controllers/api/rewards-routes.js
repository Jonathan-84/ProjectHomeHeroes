const router = require('express').Router();
const { Rewards, Users} = require('../../models');
const { authToken } = require('../../utils/auth');

// // GET ALL /api/rewards
// router.get('/', (req, res) => {
//     // Access our User model and run .findAll() method)
//     Rewards.findAll({
//       attributes: [
//         'id', 
//         'rewards_name',
//         'rewards_description', 
//         'redemption_value'
     
//       ],
//       include: [
//         {
//           model: Users,
//           attributes: ['name', 'id']
//         }
//       ]
//       })
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// GET One reward  /api/rewards/1

router.get('/users/:userId/:id', (req, res) => {
    Rewards.findOne({
      where: {
        id: req.params.id,
        users_id: req.params.userId
      },
      attributes: ['id','rewards_name', 'rewards_description', 'redemption_value', 'users_id'],
      include: [
        {
          model: Users,
          attributes: ['name']
        }
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

// GET ALL Rewards /api/users/1/1
router.get('/users/:userId', (req, res) => {
  Rewards.findAll({
    where: {
      // id: req.params.id,
      users_id: req.params.userId
    },
    attributes: ['id','rewards_name', 'rewards_description', 'redemption_value', 'users_id'],
    include: [
      {
        model: Users,
        attributes: ['name']
      }
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

// POST /api/rewards
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
    Rewards.create({
      rewards_name: req.body.rewards_name,
      rewards_description: req.body.rewards_description,
      redemption_value: req.body.redemption_value,
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

// PUT /api/rewards/1
router.put('/:id', (req, res) => {
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Rewards.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No reward found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/rewards/1
router.delete('/:id', (req, res) => {
    Rewards.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No reward found with this id' });
          return;
        }
        res.status(200).json({ message: 'Reward has been removed from list'});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;