const express = require('express');
const router = express.Router();
const profileController =  require("../controller/profile");

router.get('/', profileController.getProfile);

router.post('/updateProfile', profileController.updateProfile);

module.exports = router;