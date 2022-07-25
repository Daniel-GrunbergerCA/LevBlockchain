const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const LevCoinSchema = new Schema({
    numberOfCoins: {
        type: Number
    },
    active: {
        type: Boolean
    },
});


LevCoinSchema.statics.update = async function(coinsToEmit) {
    let currValue = await this.find({active: true});
    let newValue = currValue[0].numberOfCoins + coinsToEmit;
    let newCoin = {
        numberOfCoins: newValue,
        active: true,
    }
    return this.updateOne( {active: true}, newCoin);
}

LevCoinSchema.statics.getNumberOfCoins = async function() {
    return this.find({});
}

LevCoinSchema.statics.add = async function() {
    let b = {
        numberOfCoins: 10,
        active: true
    }
    return this.create(b);
}


module.exports = mongoose.model('levCoin', LevCoinSchema);