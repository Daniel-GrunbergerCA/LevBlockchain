const Feedbacks = require('../models/feedbacks');

const getFeedbacks = async (req, res) => {
    try {
        let feedbacks = await Feedbacks.getTenFeedbacks();
        res.send(feedbacks);
    }
    catch (err) { console.log(`Failed: ${err}`) }
}

const addFeedback = async (req, res) => {
    let postData = req.body;
    let feedback = {
        feedback: postData.feedback,
        user: postData.user,
        rating: Number(postData.rating),
    };
    
    try {
        await Feedbacks.add(feedback);
        res.sendStatus(200);
    }
    catch (err) { console.log(`Failed: ${err}`) }
}

module.exports = {
    addFeedback,
    getFeedbacks
};