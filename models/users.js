const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); 

const positions = {
    CLIENT: "client",
    MANAGER : "manager"
}

const queryFilter = 
    {
        _id: false,
        __v: false,
        created_at: false,
        updated_at: false,
        status: false,
    };

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: 
    { 
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    position: {
        type: String,
        enum: [positions.MANAGER, positions.CLIENT],
        required: true
    },
    status: {
        type: String
    },
    email :{
        type: String,
        unique: true,
    },
    created_at: Date,
    updated_at: Date
});


UserSchema.statics.getAllClients = async function() {
    return this.find({}, 
        queryFilter);
};

UserSchema.statics.getByUsername = async function(username) {
    return this.findOne({
        username: username,
    },
    queryFilter
    );
};

UserSchema.statics.getWorkers = async function() {
    return this.find({
      position: WORKER_POSITION
    });
};


UserSchema.statics.edit = async function(user) {
    return this.updateOne( {username: user.username}, user);
};

UserSchema.statics.add = async function(user) {
    return this.create(user);
}

UserSchema.statics.delete = async function(user) {
    return this.deleteOne({
        username: user.username
    });
};

// Save date of creation/update each time
UserSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});



// plugin for username + password login
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);