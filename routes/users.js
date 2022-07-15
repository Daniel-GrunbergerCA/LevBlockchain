var express = require('express');
const { use } = require('passport');
var router = express.Router();
var path = require('path');
const User = require('../models/users');
const Transactions = require('../models/transactions');
var ObjectID = require('mongodb').ObjectID;

router.get('/',  async (req, res) => {

});


router.get('/all', async function (req, res, next) {
    try {
        user = await User.getByUsername(req.user.username);
        if (user.position == "manager") {
            users =  await User.getAllClients();
            res.send(users);
        }
        else {
            res.sendStatus(401);
        }
      }
      catch (err) { 
          console.log(`Failed: ${err}`);
          res.sendStatus(404);
         };
  })
  
router.post('/add', async function (req, res) {
    postData = req.body;
 
    let user = {
        firstName: postData.firstname,
        lastName: postData.lastname,
        position:postData.position,
        username: postData.username,
        status: 'active',
        address: postData.address,
        email: postData.email,
    };
    let password =   postData.password;
    try {
        await User.register(user, password);
    }
    catch (err) { console.log(`Failed: ${err}`) };
    res.sendStatus(200);
  
});

router.post('/edit', async function (req, res) {
    postData = req.body;
    let user = {
        firstName: postData.firstname,
        lastName: postData.lastname,
        position:postData.position,
        username: postData.username,
        status: 'active',
        address: postData.address,
        email: postData.email,
    };
    currentUser = req.user.username;
    userFromDB = await User.getByUsername(currentUser);
    
    if (userFromDB.username == currentUser.username || userFromDB.position == "manager") {
        try {
            await User.edit(user);
        }
        catch (err) { console.log(`Failed: ${err}`) };
        res.sendStatus(200);
    }
    else {
        res.send(401);
    }
});



router.post('/delete', async function (req, res) {
    postData = req.body;
    let user = {
        username: postData.username,
    };
    currentUser = req.user.username;
    userFromDB = await User.getByUsername(currentUser);
    
    if (userFromDB.username == currentUser.username || userFromDB.position == "manager") {
        try {
            await User.delete(user);
        }
        catch (err) { console.log(`Failed: ${err}`) };
        res.sendStatus(200);
    }
    else {
        res.send(401);
    }
});


router.get('/:username/transactions', async function (req, res, next) {
    user = req.params.username;
    currentUser = req.user.username;

    userFromDB = await User.getByUsername(currentUser);
    if (userFromDB.username == user || userFromDB.position == "manager") {
        try {
            let transactions = await Transactions.getTransactionsForUser(userFromDB);
            res.send(transactions);
        }
        catch (err) { console.log(`Failed: ${err}`) }
    }

    res.sendStatus(401);
});


router.post('/getUser', async function (req, res, next) {
    currentUser = req.user.username;
    user = await User.getByUsername(currentUser);
    res.send(user);
});


module.exports = router;