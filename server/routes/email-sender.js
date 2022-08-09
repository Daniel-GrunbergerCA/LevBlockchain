const express = require('express');
const router = express.Router();
const emailSenderController = require("../controller/email-sender");

router.post('/reset', emailSenderController.sendResetEmail);

module.exports = router;