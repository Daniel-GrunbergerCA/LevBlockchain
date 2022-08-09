const User = require('../models/users');

const getProfile = async (req, res) => {
    currentUser = req.user;
    if ( currentUser == undefined) {
        res.redirect("/login");
    } else {
        user = await User.getByUsername(currentUser.username);
        res.send(user);
    }
}

const updateProfile = async (req, res) => {

    currentUser = req.user.username;
    currentUser = await User.getByUsername(currentUser);
    updatedUser= new User({username : req.body.username, firstName: req.body.firstname, 
        lastName: req.body.lastname, position:currentUser.position, 
    password: currentUser.password, _id: currentUser._id});  
    try {
        await User.updateOne( {username: currentUser.username}, updatedUser);
    }
    catch (err) { console.log(`Failed: ${err}`) }
}

module.exports = {
    updateProfile,
    getProfile
};