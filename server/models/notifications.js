const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = {
    WARNING: "warning",
    REQUEST : "request",
    REQUEST_GRANTED: "request_granted",
}

const statuses = {
    PENDING: "pending",
    REJECTED : "rejected",
    ACCEPTED: "accepted",
    READ: "read",
}

const NotificationSchema = new Schema({
    message: {
        type: String,
        required: true
    }, 
    category :{
        type: String, 
        required: true
    },
    from: {
        type: String,
    },
    to: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    returnDate: {
        type: Date
    }
}, {timestamps: true});

NotificationSchema.statics.getNotificationsForUser = async function(username) {
    return this.find({
        to: username
      });
};

NotificationSchema.statics.add = async function(notification) {
    return this.create(notification);
}

NotificationSchema.statics.edit = async function(notification) {
    return this.updateOne( {_id: notification._id}, notification);
};

NotificationSchema.statics.getAll = async function() {
    return this.find({
      });
};

NotificationSchema.statics.getNotificationsByStatus = async function(username, status) {
    return this.find({
        status: status,
        to: username,
      });
};

  
module.exports = mongoose.model('notifications', NotificationSchema);