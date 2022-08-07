var express = require('express');
var router = express.Router();
const Transactions = require('../models/transactions');
const Feedbacks = require('../models/feedbacks');

router.get('/', async function(req, res) {    
        try {
            let feedbacks = await Feedbacks.getTenFeedbacks();
            res.send(feedbacks);
        }
        catch (err) { console.log(`Failed: ${err}`) }
});

router.post('/add', async function(req, res) {    
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

});


module.exports = router;