const Notifications = require('../models/notifications');
const User = require('../models/users');

const getNotificationsForUser = async (req, res) => {
    currentUser = req.user;
    if ( currentUser == undefined) {
        res.redirect("/login");
    } else {
        user = await User.getByUsername(currentUser.username);
        let notifications = Notifications.getNotificationsForUser(user.username);
        res.send(notifications);
    }
};

const getPendingNotifications = async (req, res) => {
    currentUser = req.user;
    if ( currentUser == undefined) {
        res.redirect("/login");
    } else {
        user = await User.getByUsername(currentUser.username);
        try {
            let notifications = await Notifications.getNotificationsByStatus(user.username, "pending");
            res.send(notifications);
        }  
        catch (err) { console.log(`Failed: ${err}`) };
        
        }
}

const getAllNotifications = async (req, res) => {
    currentUser = req.user;
    if ( currentUser == undefined) {
        res.redirect("/login");
    } else {
        user = await User.getByUsername(currentUser.username);
        if (user.position == "manager") {
            let notifications = Notifications.getAll();
            res.send(notifications);
        } else {
            res.sendStatus(401);
        }
    }
}

const postRequestNotification = async (req, res) => {
    currentUser = req.user;
    let askingUser = await User.getByUsername(currentUser.username);
    let askedUser = req.body.to;
    let askedAmmount = req.body.ammount;
    let returnDate = req.body.returnDate;


    let notification = {
        from: askingUser.username,
        category: "request",
        to: askedUser,
        message: `${askingUser.username} asks for ${askedAmmount} LevCoins from you!`,
        status: "pending",
        returnDate: returnDate
    }

    try {
        await Notifications.add(notification);
    }

    catch (err) { console.log(`Failed: ${err}`) };

     res.sendStatus(200);
}

const rejectNotification = async (req, res) => {
    currentUser = req.user;
    let notification = req.body.notification;

    notification.status = "rejected";

    try {
        await Notifications.edit(notification);
    }

    catch (err) { console.log(`Failed: ${err}`) };

    let asked =  (notification.message).split(" ");
    asked = asked[3];

    let notificationForUser = {
        status: "pending",
        to: notification.from,
        category: "warning",
        message: `${notification.to} rejected your request for ${asked} LevCoins`,
    }

    try {
        await Notifications.add(notificationForUser);
    }

    catch (err) { console.log(`Failed: ${err}`) };


     res.sendStatus(200);
}

const dismissNotification = async (req, res) => {
    currentUser = req.user;
    let notification = req.body.notification;

    notification.status = "read";

    try {
        await Notifications.edit(notification);
    }

    catch (err) { console.log(`Failed: ${err}`) };

    res.sendStatus(200);
}

const acceptNotification = async (req, res) => {
    currentUser = req.user;
    let notification = req.body.notification;

    notification.status = "accepted";

    try {
        await Notifications.edit(notification);
    }

    catch (err) { console.log(`Failed: ${err}`) };

    res.sendStatus(200);
}


module.exports = {
    acceptNotification,
    dismissNotification,
    rejectNotification,
    postRequestNotification,
    getAllNotifications,
    getPendingNotifications,
    getNotificationsForUser
}