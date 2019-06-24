const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model
const User = require('../models/User');


//Login Page
router.get('/login', (req, res) => {
  res.render('login')
});

//Register Page
router.get('/register', (req, res) => {
  res.render('register')
});

//Register Handle
router.post('/register', (req, res) => {
  // console.log(req.body)
  // res.send('hekko');
  const { name, email, password, password2, secondName, facultet } = req.body;

  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2 || !secondName || !facultet) {
    errors.push({ msg: 'Будь-ласка заповнiть всi поля' })
  }

  //Check password match
  if (password !== password2) {
    errors.push({ msg: 'Паролi не спiвпадають' })
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Пароль має бути не менше 6 знакiв' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      secondName,
      facultet
    })
  } else {
    //Validation passed
    User.findOne({ email: email })
      .then(user => {
        //User exist
        if (user) {
          errors.push({ msg: 'Такий Email вже зареєcтровано' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            secondName,
            facultet
          })
        } else {
          const newUser = new User({
            name,
            email,
            password,
            secondName,
            facultet
          })

          // console.log(newUser)
          // res.send('hello')
          // Hash Password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            // Save user
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'Ви зареєстровані та можете увiйти');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          }))
        }
      })
  }


});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Ви вийшли з аккаунту')
  res.redirect('/users/login')
});


module.exports = router;