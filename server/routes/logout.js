var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.get('/', function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        else {
            res.sendStatus(200);
        }
      });
    // req.session.destroy(() => {
    //     res.clearCookie('connect.sid');
    //     res.redirect('/login');
    // })
});

  

module.exports = router;