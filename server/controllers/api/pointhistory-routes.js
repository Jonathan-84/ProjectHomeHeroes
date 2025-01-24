const router = require('express').Router();
const { PointHistory} = require('../../models/PointHistory');
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



// GET One reward  /api/redemptions/users/1/1
router.get('/users/:userId/:id', (req, res) => {
  PointHistory.findOne({
      where: {
        id: req.params.id,
        users_id: req.params.userId
      },
      attributes: ['id','change_category', 'change_details','date_changed', 'reward_delivered', 'kids_id'],
      
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

// GET ALL Rewards /api/redemptions/users/1
router.get('/users/:userId', (req, res) => {
  PointHistory.findAll({
    where: {
      // id: req.params.id,
      users_id: req.params.userId
    },
    attributes: ['id','change_category', 'change_details','date_changed', 'reward_delivered', 'kids_id'],
    
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

 // get redemptions by kid
 router.get('/users/:userId/:kidsId', (req, res) => {
  PointHistory.findAll({
    where: {
      // id: req.params.id,
      users_id: req.params.userId,
      kids_id: req.params.kidsId
    },
    attributes: ['id','change_category', 'change_details','date_changed', 'reward_delivered', 'kids_id'],
    
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

// POST /api/redeemptions
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
    PointHistory.create({
      change_category: req.body.change_category,
      change_details: req.body.change_details,
      date_changed: req.body.date_changed,
      reward_delivered: req.body.reward_delivered,
      kids_id: req.body.kids_id,
      // tasks_id: req.body.tasks_id
    })
      .then(dbUserData => {
        res.json(dbUserData)})
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// PUT /api/redemptions/1
router.put('/:id', (req, res) => {
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    PointHistory.update(req.body, {
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

// DELETE /api/redemptions/1
router.delete('/:id', (req, res) => {
    PointHistory.destroy({
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