var passport = require('passport');

const login = () => {
  passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/profile',
  })};

  

module.exports = {
  login
};