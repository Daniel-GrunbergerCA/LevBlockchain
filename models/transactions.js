const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto'); 

const transactions = {
    LOAN : "loan",
    TRANSFER : "transfer"
}

const TransactionSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    ammount: 
    { 
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum : [transactions.LOAN, transactions.TRANSFER],
        required: true
    },
    timestamp: {
        type: Date
    },
    hash: {
        type: String
    },
    previousHash:
    {
        type: String
    }
});



  
function computeHash() {
        let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data) ;
        return crypto.createHash("sha256").update(strBlock).digest("hex");
}



TransactionSchema.statics.getLastBlock = async function() {
    return this.findOne({$query: {}, $orderby: {$natural : -1}});
}


TransactionSchema.statics.getAll = async function(newBlock) {
   return this.find();
};

TransactionSchema.statics.getTransactionsForUser = async function(username) {
    return this.find(
        {
            $query: {
                $or: 
                [
                    {
                          sender: username
                    }, 
                    { 
                        receiver:username 
                    } 
                ] 
        }
    });
 };


TransactionSchema.statics.add = async function(newBlock) {
    newBlock.prevHash = TransactionSchema.getLastBlock().hash;
    newBlock.hash = computeHash();
    this.blockchain.push(newBlock) ;
    return this.create(newBlock);
};


// Save date of creation/update each time
TransactionSchema.pre('save', function(next) {
    this.timestamp =  Date.now();
    next();
});


module.exports = mongoose.model('transactions', TransactionSchema);