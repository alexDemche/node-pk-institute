const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const path = require('path');
//Main HTML
// router.get('/main', function (req, res) {
// res.sendFile(path.join(__dirname + '/public/main.html'));
//__dirname : It will resolve to your project folder.
// });

//  Welcome Page
router.get('/', (req, res) => {
  res.render('welcome');
});

//  Dashboard Page
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { name: req.user.name });
});

// Main HTML Page
router.get('/main', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/main.html'));
});

module.exports = router;