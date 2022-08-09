var express = require('express');
var router = express.Router();
const logoutController = require("../controller/logout");

router.get('/', logoutController.logout);

  
module.exports = router;