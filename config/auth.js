module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Будб-ласка увiйдiть в аккаунт');
    res.redirect('/users/login');
  }
}