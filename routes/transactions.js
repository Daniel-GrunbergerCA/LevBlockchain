var express = require('express');
var router = express.Router();
const Transactions = require('../models/transactions');


router.get('/', async function(req, res) {      
    user = req.user.username;
    try {
        let transactions = await Transactions.getTransactionsForUser(user);
        res.send(transactions);
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

router.post('/add', async function (req, res, next) {
    try {
        await Transactions.add();
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

module.exports = router;