var express = require("express");
var router = express.Router();
const transactionsController = require("../controller/transactions");

router.get('/all', transactionsController.getAllTransactions);

router.post('/transfer', transactionsController.transfer);
router.post('/borrow', transactionsController.borrow);

module.exports = router;