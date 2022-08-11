var passport = require('passport');

const login = (req, res) => {
  passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/profile',
  })};

  

module.exports = {
  login
};