const express = require('express');
const quickSyncRouter = express.Router();
require('dotenv').config();
var Web3 = require('web3');
const Transactions = require('../model/transactions');

var web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));

const start = async function(blocknumber){
    const latest = await web3.eth.getBlockNumber();
    for(let i = blocknumber + 1; i < latest; i++){
        const blockInfo = await web3.eth.getBlock(i);
        if(blockInfo.transactions[0]!=null){
            //console.log(blockInfo.transactions);
            const transactionCount = await web3.eth.getBlockTransactionCount(i + 1);
            for(let j = 0; j < transactionCount; j++){
                const transactionDetails = await web3.eth.getTransaction(blockInfo.transactions[j]);
                console.log("from: " +transactionDetails.from,
                            "\nto: " +transactionDetails.to,
                            "\nblockNumber: " +transactionDetails.blockNumber,
                            "\ntransactionHash: " +blockInfo.transactions[j],
                            "\n-----------------------------------------------");
                Transactions.create({
                    from: transactionDetails.from,
                    to: transactionDetails.to,
                    blockNumber: transactionDetails.blockNumber,
                    transactionHash: blockInfo.transactions[j]
                });
            }
        }
    }
}

quickSyncRouter.route('/')
.get((req,res,next) => {
    Transactions.find().limit(1).sort({$natural:-1})
    .then((result) => {
        start(result[0]._doc.blockNumber);
    })
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json("Quick sync done!");
    })
    .catch(err => {
    console.log(err);
    res.status(500).send("Error");
    })
});

module.exports = quickSyncRouter;