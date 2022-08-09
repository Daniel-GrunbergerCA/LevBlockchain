var express = require('express');
var router = express.Router();
const feedbacksController = require("../controller/feedbacks");

router.get('/', feedbacksController.getFeedbacks);

router.post('/add', feedbacksController.addFeedback);

module.exports = router;