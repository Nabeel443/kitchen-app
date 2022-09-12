const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const bcrypt = require('bcrypt');

router.get('/', (req, res, next) =>  {
  const allUsers = User.find();
  allUsers
  .then(users  =>  {
    res.status(201).json({
      results: users
    });
  })
  .catch(err =>  {
    res.status(500).json({
      error: err
    })
  })
});

router.post('/signup', (req, res, next) =>  {
  bcrypt.hash(req.body.password, 10)
    .then(hash  =>  {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result  =>  {
          res.status(201).json({
            message: 'User created!',
            userData: result
          });
        })
        .catch(err =>  {
          res.status(500).json({
            error: err
          })
        })
    })
});

router.post('/login', (req, res, next)  =>  {
  let fetchedUser;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user  =>  {
      if(!user) {
        return res.status(401).json({
          message: "Auth failed."
        });
      }
      fetchedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(result  =>  {
      if(!result) {
        return res.status(401).json({
          message: "Auth failed."
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email },
        'secret_this_should_be_longer',
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err =>  {
      return res.status(401).json({
        message: "Auth failed.",
        error: err
      });
    })
})

module.exports = router;
