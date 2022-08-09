var express = require('express');
var router = express.Router();
var passport = require('passport');

// TODO: move to controller
router.post(
    '/',
    passport.authenticate('local', {
      failureRedirect: '/register',
      successRedirect: '/profile',
    }),
  );
  

module.exports = router;