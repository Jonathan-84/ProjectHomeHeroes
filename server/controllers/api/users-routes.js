const router = require('express').Router();
const { Users, Kids, Tasks } = require('../../models');
const { signToken } = require('../../utils/auth');

// GET all/api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Users.findAll()
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

    // POST /api/users
// router.post('/', (req, res) => {
//     // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
//     Users.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       role: req.body.role, 
//       reset_hint: req.body.reset_hint,
//       reset_code: req.body.reset_code
//     })
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

  // PUT /api/users/1/pwreset
  router.put('/:id/pwreset/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role: 'Uncle'}

        // Find the user by ID 
        Users.findOne({
          where: { id: req.params.id }
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
        
          // Check the reset code
          // const validResetCode = dbUserData.checkResetCode(req.params.reset_code);
          // if (!validResetCode) {
          //   res.status(400).json({ message: 'Incorrect reset code!' });
          //   return;
          // }
        
          let token;
          token = signToken(dbUserData);
          res.json({ token, user: dbUserData });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
      });        

// GET /api/users/1
router.get('/:id', (req, res) => {
    Users.findOne({
      where: {
        id: req.params.id
      }, include:[Kids]
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

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role:"Uncle"}
    Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      reset_hint: req.body.reset_hint,
      reset_code: req.body.reset_code
    })
    .then(dbUserData => {
      // req.session.save(() => {
      //   req.session.user_id = dbUserData.id;
      //   req.session.name = dbUserData.name;
      //   req.session.loggedIn = true;
      let token;
      token = signToken(dbUserData);
      res.json({dbUserData, token})
      // });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', role: 'Uncle'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Users.update(req.body, {
      individualHooks: true,
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

  /// login
  router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      let token;
    token = signToken(dbUserData);
     res.json({ token, user: dbUserData, message: 'You are now logged in!' });
     
    
      // });
    });
  });


  /// logout
  // router.post('/logout', (req, res) => {
    
  //   let token;
  //      token = signToken();
  //     res.clearCookie(token)
  //     });
    

  
// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    Users.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.status(200).json({ message:'User has been deleted'});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;