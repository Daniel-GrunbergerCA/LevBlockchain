var express = require('express');
var router = express.Router();
var notificationsController = require('../controller/notifications')

router.get('/', notificationsController.getNotificationsForUser);
router.get('/pending', notificationsController.getPendingNotifications);
router.get('/all', notificationsController.getAllNotifications);

router.post('/request', notificationsController.postRequestNotification);
router.post('/reject', notificationsController.rejectNotification);
router.post('/dismiss', notificationsController.dismissNotification);
router.post('/accept', notificationsController.acceptNotification);



module.exports = router;