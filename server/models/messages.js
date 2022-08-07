const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
   receiver : {
       type: String,
       required: true
   },
   sender : {
    type: String,
    required: true
   },
   content : {
    type: String,
    required: true
   },
}, {timestamps: true});


MessageSchema.statics.add = async function(msg) {
    return this.create(msg);
}

MessageSchema.statics.getMessages = async function(sender, receiver) {
    return this.find({
        $or: [
            { sender: sender, receiver: receiver },
            { receiver:sender, sender: receiver }
        ]
    }).sort({ updatedAt: 1 });
};



module.exports = mongoose.model('messages', MessageSchema);