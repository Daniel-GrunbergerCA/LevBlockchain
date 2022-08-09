var express = require("express");
var router = express.Router();
const userController = require("../controller/users");

router.get('/manager', userController.getManager);
router.get('/all', userController.getAllUsers);
router.get('/getAnotherUser', userController.getAnotherUser);

router.post('/add', userController.addUser);
router.post('/edit', userController.editUser); // bug when editing details
router.post('/delete', userController.deleteUser);
router.post('/getUser', userController.getUser);


module.exports = router;
