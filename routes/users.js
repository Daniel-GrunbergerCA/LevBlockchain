var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../models/users');
var ObjectID = require('mongodb').ObjectID;

router.get('/',  async (req, res) => {
  //  res.json({"users": ["one", "two", "three"]});
//   try {
//     users =  await User.getAll();
//     res.send(users);
//   }
//   catch (err) { console.log(`Failed: ${err}`) }
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
    action = postData.action;

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
    if (action == 'add') {
        await createUser(user, password);
    }
    else if (action == 'edit') {
        editUser(user);
    }
    else if (action == 'delete') {
        deleteUser(user);
    }
    else {
        res.sendStatus(400);
    }
    res.sendStatus(200);
  
});

router.get('/new', function(req, res) {       
    Users=new User({username : "danielg", email: "danielg@gmail.com",firstname:"daniel", 
        lastname: "grunberger", position:'Manager'});   
          User.register(Users, req.body.password, function(err, user) { 
            if (err) { 
              res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
            }else{ 
                res.render('index.ejs');
            } 
          }); 
});

  
async function createUser(user, password) {
    try {
        await User.register(user, password);
    }
    catch (err) { console.log(`Failed: ${err}`) }
};
  
  
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
  
router.post('/getUser', async function (req, res, next) {
    currentUser = req.user.username;
    user = await User.getByUsername(currentUser);
    res.send(user);
});


async function  deleteUser(user){
    try {
        await User.delete(user);
    }
    catch (err) { console.log(`Failed: ${err}`) }
 
 };

module.exports = router;