const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

let path = require('path');

const app = express();


const User = require('./models/User');
// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Static for HTML
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
  secret: 'secred',
  resave: true,
  saveUninitialized: true,
  // cookie: {secure: true}
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//  Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Main Page, after login
// app.get('/main', function (req, res) {
//   res.sendFile(path.join(__dirname + '/public/main.html'));
// });

// List of All Users
app.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.send('something go wrong');
      next();
    }
    // let allUsers = res.json(users.map(user => `Iм'я: ${user.name} ${user.secondName}, Почта: ${user.email}, Факультет: ${user.facultet}`));
    let us = res.json(users.map(user => `****** Iм'я: ${user.name}${user.secondName}, Факультет: ${user.facultet} ******`).toString());
  })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}...`))