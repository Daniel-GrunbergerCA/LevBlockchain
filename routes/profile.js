var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.get('/', async function(req, res) {       
    currentUser = req.user.username;
    user = await User.getByUsername(currentUser);
    res.send(user);
});

router.post('/update', async function (req, res, next) {
    currentUser = req.user.username;
    currentUser = await User.getByUsername(currentUser);
    updatedUser= new User({username : req.body.username, firstName: req.body.firstname, 
        lastName: req.body.lastname, position:currentUser.position, 
    password: currentUser.password, _id: currentUser._id});  
    try {
        await User.updateOne( {username: currentUser.username}, updatedUser);
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

module.exports = router;