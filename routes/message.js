var express = require('express');
var router = express.Router();
const Message = require('../models/messages');


router.get('/sent', async function(req, res) {      
    let sender =  req.user.username; 
    
});

router.post('/send', async function (req, res, next) {
    let msg = {
        sender: req.user.username,
        receiver: req.body.receiver,
        content: req.body.content
    } 
    try {
        await Message.add(msg);
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

module.exports = router;