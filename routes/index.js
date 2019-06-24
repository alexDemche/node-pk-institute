const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


const path = require('path');
//Main HTML
// router.get('/main', function (req, res) {
// res.sendFile(path.join(__dirname + '/public/main.html'));

// });

//  Welcome Page
router.get('/', (req, res) => {
  res.render('welcome');
});

//  Dashboard Page
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    name: req.user.name,
    secondName: req.user.secondName,
    email: req.user.email,
    facultet: req.user.facultet,
  });
});


// Main HTML Page
router.get('/main', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
  // const all = require('../routes/users').all;
  // res.render('main', { name: req.user.name, email: req.user.email });
});


module.exports = router;