var express = require('express');
var router = express.Router();
const Transactions = require('../models/transactions');
const LevCoin = require('../models/levCoin');
const User = require('../models/users');
const axios = require('axios');

router.get('/', async function(req, res) {      
    user = req.user.username;
    try {
        let transactions = await Transactions.getTransactionsForUser(user);
        res.send(transactions);
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

router.post('/transfer', async function (req, res, next) {
    
    let currentUser = req.user;
    if (currentUser == undefined) {
        res.send(403);
        return;
    } 
    
    let receiver = req.body.receiver;
    let ammount = req.body.ammount;
    let currency = req.body.currency; 

    if (currency == "NIS") {
        let response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/ils/usd.json');
        let conversionRate = response.data.ils;
        ammount = ammount * conversionRate;
        console.log("ammount in NIS" + ammount)
    }
        

    // check user exists
    receiver = await User.getByUsername(receiver);
    if (receiver == undefined) {
        res.send({"error": "user does not exist"});
        return;
    }

    // check has balance
    currentUser = await User.getByUsername(currentUser.username);

    if (currentUser.balance < ammount) {
        res.send({"error": "unsificcient funds"});
        return;
    }

    let newBlock = {
        sender: currentUser,
        receiver: receiver,
        ammount: ammount,
        timestamp: new Date(),
        prevHash: "",
        hash: "",
        type: "transfer",
        status: "approved",
    }
    try {
        await Transactions.add(newBlock);
    }
    catch (err) { console.log(`Failed: ${err}`) }

    try {
        await LevCoin.update(newBlock.ammount);
    }
    catch (err) { console.log(`Failed: ${err}`) }

    receiver.balance += newBlock.ammount;
    try {
        await User.edit(receiver);
    }
    catch (err) { console.log(`Failed: ${err}`) }

});

module.exports = router;