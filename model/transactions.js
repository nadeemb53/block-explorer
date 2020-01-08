var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    },
    transactionHash: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Transactions = mongoose.model('transaction', transactionSchema);

module.exports = Transactions;