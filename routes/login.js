var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post(
    '/',
    passport.authenticate('local', {
      failureRedirect: '/register',
      successRedirect: '/profile',
    }),
  );

  router.get('/',(req, res) => {
     
    }
  );

  

module.exports = router;