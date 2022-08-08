const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const FeedbackSchema = new Schema({
    feedback: {
        type: String,
        required: true
    }, 
    user :{
        type: String, 
        required: true
    },
    rating: {
        type: Number,
    },
    image: {
        type: String,
        default: "",
    },
});

FeedbackSchema.statics.getTenFeedbacks = async function() {
    return this.find({}).limit(10);
};

FeedbackSchema.statics.add = async function(notification) {
    return this.create(notification);
}


  
module.exports = mongoose.model('feedbacks', FeedbackSchema);