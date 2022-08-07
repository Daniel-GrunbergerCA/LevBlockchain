var express = require("express");
const { use } = require("passport");
var router = express.Router();
var path = require("path");
const User = require("../models/users");
const Transactions = require("../models/transactions");
var fs = require("fs");
const multer = require("multer");

const upload = multer();

router.get("/manager", async (req, res) => {
  try {
    let manager = await User.getManager();
    res.send(manager);
  } catch (err) {
    console.log(`Failed: ${err}`);
    res.sendStatus(404);
  }
});
const findFirstDiff = (str1, str2) =>
  str2[[...str1].findIndex((el, index) => el !== str2[index])];

router.get("/all", async function (req, res, next) {
  try {
    let user = await User.getByUsername(req.user.username);
      users = await User.getAllClients();
      users = users.filter((u) => u.username !== user.username);
      res.send(users);
  } catch (err) {
    console.log(`Failed: ${err}`);
    res.sendStatus(404);
  }
});

router.post("/add", upload.single("avatarImg"), async function (req, res) {
  postData = req.body;

  let user = {
    firstName: postData.firstName,
    lastName: postData.lastName,
    position: postData.position,
    username: postData.username,
    status: "active",
    address: postData.address,
    email: postData.email,
    image: postData.img,
    balance: postData.balance,
  };
  let password = postData.password;
  try {
    await User.register(user, password);
  } catch (err) {
    console.log(`Failed: ${err}`);
  }
  res.sendStatus(200);
});

router.post("/edit", async function (req, res) {
  postData = req.body;
  let user = {
    firstName: postData.firstname,
    lastName: postData.lastname,
    position: postData.position,
    username: postData.username,
    status: "active",
    address: postData.address,
    email: postData.email,
    image: null,
  };
  currentUser = req.user.username;
  userFromDB = await User.getByUsername(currentUser);
  if (
    userFromDB.username == currentUser.username ||
    userFromDB.position == "manager"
  ) {
    try {
      user.image = userFromDB.image;
      console.log(user);
      await User.edit(user);
    } catch (err) {
      console.log(`Failed: ${err}`);
    }
    res.sendStatus(200);
  } else {
    res.send(401);
  }
});

router.post("/delete", async function (req, res) {
  postData = req.body;
  let user = {
    username: postData.username,
  };
  currentUser = req.user.username;
  userFromDB = await User.getByUsername(currentUser);

  if (
    userFromDB.username == currentUser.username ||
    userFromDB.position == "manager"
  ) {
    try {
      await User.delete(user);
    } catch (err) {
      console.log(`Failed: ${err}`);
    }
    res.sendStatus(200);
  } else {
    res.send(401);
  }
});

// not ready
router.get("/:username/transactions", async function (req, res, next) {
  user = req.params.username;
  currentUser = req.user.username;

  userFromDB = await User.getByUsername(currentUser);
  if (userFromDB.username == user || userFromDB.position == "manager") {
    try {
      let transactions = await Transactions.getTransactionsForUser(userFromDB);
      res.send(transactions);
    } catch (err) {
      console.log(`Failed: ${err}`);
    }
  }

  res.sendStatus(401);
});

router.post("/getUser", async function (req, res, next) {
  currentUser = req.user.username;
  user = await User.getByUsername(currentUser);
  res.send(user);
});



router.get("/getAnotherUser", async function (req, res, next) {
  let user = req.query.username;
  user = await User.getByUsername(user);
  res.send(user);
});

// router.post('/addRandom', async function (req, res) {
//     let postData = req.body;
//     let user = {
//         firstName: postData.firstname,
//         lastName: postData.lastname,
//         position:postData.position,
//         username: postData.username,
//         status: 'active',
//         address: postData.address,
//         email: postData.email,
//         image: postData.img,
//         balance: postData.balance,
//     };
//     let password =   postData.password;
//     try {
//         await User.register(user, password);
//     }

//     catch (err) { console.log(`Failed: ${err}`) };

//     res.sendStatus(200);
// });

module.exports = router;
