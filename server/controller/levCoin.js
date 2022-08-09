const axios = require('axios');
const LevCoin = require('../models/levCoin');


const getCoinValueInUSD = async (req, res) => {
    let numberOfCoins = await LevCoin.getNumberOfCoins();
    let value = convertCoinValueToUSD(numberOfCoins[0].numberOfCoins);
    let resp = {
        "value": value,
    } 
    res.send(resp);
};

const getCoinValueinNIS = async (req, res) => {
    let numberOfCoins = await LevCoin.getNumberOfCoins();
    let value = await convertCoinValueToNIS(numberOfCoins[0].numberOfCoins);
    let resp = {
        "value": value,
    } 
    res.send(resp);
}

function convertCoinValueToUSD(numberOfCoins) {
    return 10 / (numberOfCoins * 0.1);
}

async function convertCoinValueToNIS(numberOfCoins) {
    let valueInUSD = convertCoinValueToUSD(numberOfCoins);
    let response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/ils.json');
    let conversionRate = response.data.ils;
    let ammountInNIS = valueInUSD * conversionRate;
    
    return ammountInNIS;
}

module.exports = {
    getCoinValueInUSD,
    getCoinValueinNIS
};