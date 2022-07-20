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

MessageSchema.statics.getMessageSent = async function(sender, receiver) {
    return this.find(
        {
            $query: {
                $and: 
                [
                    {
                          sender: sender
                    }, 
                    { 
                        receiver:receiver 
                    } 
                ] 
        }
    });
};



module.exports = mongoose.model('users', MessageSchema);