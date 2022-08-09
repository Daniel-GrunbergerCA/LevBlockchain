var express = require('express');
var router = express.Router();
const messagesController = require("../controller/messages");


router.get('/sent', messagesController.getSentMessages);

router.post('/send', messagesController.sendMessage);

module.exports = router;