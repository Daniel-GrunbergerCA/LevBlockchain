const User = require("../models/users");

const getManager = async (req, res) => {
  try {
    let manager = await User.getManager();
    res.send(manager);
  } catch (err) {
    console.log(`Failed: ${err}`);
    res.sendStatus(404);
  }
};

const getAllUsers = async  (req, res) =>  {
  try {
    let user = await User.getByUsername(req.user.username);
      users = await User.getAllClients();
      users = users.filter((u) => u.username !== user.username);
      res.send(users);
  } catch (err) {
    console.log(`Failed: ${err}`);
    res.sendStatus(404);
  }
};

const addUser = async (req, res) => {
  postData = req.body;
  let user = getUserFromPostBody(postData);
  let password = postData.password;
  try {
    await User.register(user, password);
  } catch (err) {
    console.log(`Failed: ${err}`);
  }
  res.sendStatus(200);
};

const getUserFromPostBody =  (postData) => {
  let user = {
    firstName: postData.firstName,
    lastName: postData.lastName,
    position: postData.position,
    username: postData.username,
    status: "active",
    address: postData.address,
    email: postData.email,
  };
  return user;
}

const editUser = async (req, res) => {
  postData = req.body;
  let user = getUserFromPostBody(postData);
  currentUser = req.user.username;
  userFromDB = await User.getByUsername(currentUser);
  if ( userFromDB.username == currentUser.username || userFromDB.position == "manager") {
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
}

const deleteUser = async (req, res) => {
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
}

const getUser = async (req, res) => {
  currentUser = req.user.username;
  user = await User.getByUsername(currentUser);
  res.send(user);
}

const getAnotherUser = async (req, res) => {
  let user = req.query.username;
  user = await User.getByUsername(user);
  res.send(user);
}

module.exports = {
  getAnotherUser,
  getManager,
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  editUser
};
