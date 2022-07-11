var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post(
    '/',
    passport.authenticate('local', {
      failureRedirect: '/register',
      successRedirect: '/',
    }),
    (req, res) => {
      console.log(req.body.username);
    }
  );

  router.get('/',(req, res) => {
     
    }
  );

  

module.exports = router;