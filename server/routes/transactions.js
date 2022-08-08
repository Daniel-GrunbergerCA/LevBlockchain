var express = require('express');
var router = express.Router();
const Transactions = require('../models/transactions');
const LevCoin = require('../models/levCoin');
const User = require('../models/users');
const axios = require('axios');

router.get('/all', async function(req, res) {    
   
    user = req.user.username;
    currentUser = await User.getByUsername(user);
    if (currentUser.position == "manager"){
        try {
            let transactions = await Transactions.getAll();
            res.send(transactions);
        }
        catch (err) { console.log(`Failed: ${err}`) }
    }
    else {
        try {
            let transactions = await Transactions.getTransactionsForUser(user);
            res.send(transactions);
        }
        catch (err) { console.log(`Failed: ${err}`) }
    }
});



router.post('/transfer', async function (req, res, next) {
    let currentUser = req.user;
    if (currentUser == undefined) {
        res.sendStatus(403);
        return;
    } 

    let newBlock = await getTransferInformationFromRequest(req, currentUser);

    // check user exists
    receiver = await User.getByUsername(newBlock.receiver);
    if (receiver == undefined) {
        res.send({"error": "User does not exist"});
        return;
    }

    // check has balance
    currentUser = await User.getByUsername(newBlock.sender);

    if (currentUser.balance < newBlock.ammount) {
        newBlock.status = "failed";
        try {
            await Transactions.add(newBlock);
        }
        catch (err) { console.log(`Failed: ${err}`) }
        res.send({"error": "Unsificient funds"});
        return;
    }



    newBlock.type = "transfer";

    try {
        await Transactions.add(newBlock);
    }
    catch (err) { console.log(`Failed: ${err}`) }

   
    receiver.balance += Number(newBlock.ammount);
    try {
        await User.edit(receiver);
    }
    catch (err) { console.log(`Failed: ${err}`) }

    currentUser.balance -= Number(newBlock.ammount);

    try {
        await User.edit(currentUser);
    }
    catch (err) { console.log(`Failed: ${err}`) }


  
    if (receiver.balance == 0) {
    }

    res.send({"status": "success"});

});


router.post('/borrow', async function (req, res, next) {
    
    let currentUser = req.user;
    if (currentUser == undefined) {
        res.sendStatus(403);
        return;
    } 

    let newBlock = await getTransferInformationFromRequest(req, currentUser);

    // check user exists
    receiver = await User.getByUsername(newBlock.receiver);
    if (receiver == undefined) {
        res.send({"error": "User does not exist"});
        return;
    }

    // check has balance
    currentUser = await User.getByUsername(newBlock.sender);

    if (currentUser.balance < newBlock.ammount) {
        res.send({"error": "Unsificient funds"});
        return;
    }

     // can't lend more than half of balance
     if (currentUser.balance / 2 < newBlock.ammount) {
        newBlock.status = "failed";
        try {
            await Transactions.add(newBlock);
        }
        catch (err) { console.log(`Failed: ${err}`) }
        res.send({"error": "Can't lend more than half of your balance"});
        return;
    }


    // can't take more than 60% of balance
    if (receiver.balance * 0.6 < newBlock.ammount) {
        newBlock.status = "failed";
        try {
            await Transactions.add(newBlock);
        }
        catch (err) { console.log(`Failed: ${err}`) }
        res.send({"error": "Can't borrow more than 60% of receiver's balance"});
        return;
    }

    newBlock.type = "loan";
    newBlock.loanExpireDate = req.body.expiryDate;


    try {
        await Transactions.add(newBlock);
    }
    catch (err) { console.log(`Failed: ${err}`) }

    try {
        await LevCoin.update(newBlock.ammount);
    }
    catch (err) { console.log(`Failed: ${err}`) }
    
    receiver.balance += Number(newBlock.ammount);
    try {
        await User.edit(receiver);
    }
    catch (err) { console.log(`Failed: ${err}`) }

    currentUser.balance -= Number(newBlock.ammount);
    try {
        await User.edit(currentUser);
    }
    catch (err) { console.log(`Failed: ${err}`) }

    res.send({"status": "success"});

});




async function getTransferInformationFromRequest(req, currentUser) {
    let receiver = req.body.receiver;
    let ammount = Number(req.body.ammount);
    let currency = req.body.currency; 

    if (currency != "LevCoin") {
        let numberOfCoins = await LevCoin.getNumberOfCoins();
        numberOfCoins  = numberOfCoins[0].numberOfCoins;
        if (currency == "NIS") {
            ammount = await convertNISToLevCoin(ammount, numberOfCoins);
        } else if (currency == "USD") {
            ammount = await convertUSDToLevCoin(ammount, numberOfCoins);
        }
    }
        
    let newBlock = {
        sender: currentUser.username,
        receiver: receiver,
        ammount: ammount,
        timestamp: new Date(),
        prevHash: "",
        hash: "",
        type: "",
        status: "approved",
        loanExpireDate: undefined
    }

    return newBlock;
};

function convertCoinValueToUSD(numberOfCoins) {
    return  10 / (numberOfCoins * 0.1);
}

function convertUSDToLevCoin(ammountInUSD, numberOfCoins) {
    return convertCoinValueToUSD(numberOfCoins) * ammountInUSD;
}


async function convertNISToLevCoin(ammountInNIS, numberOfCoins) {
    let ammountInUSD = await convertNISToUSD(ammountInNIS);
    let valueinUsd = await convertCoinValueToUSD(numberOfCoins); 
    return valueinUsd * ammountInUSD;
}

async function convertNISToUSD(ammountInNIS) {
    let response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/ils/usd.json');
    let conversionRate = response.data.usd;
    console.log(ammountInNIS * conversionRate)
    return ammountInNIS * conversionRate;
}




module.exports = router;