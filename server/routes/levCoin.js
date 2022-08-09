var express = require('express');
var router = express.Router();
const levCoinController = require("../controller/levCoin");

router.get('/getValueUSD', levCoinController.getCoinValueInUSD);
router.get('/getValueNIS', levCoinController.getCoinValueinNIS);

module.exports = router;