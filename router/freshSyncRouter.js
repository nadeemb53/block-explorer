const express = require('express');
const freshSyncRouter = express.Router();
require('dotenv').config();
var Web3 = require('web3');
const Transactions = require('../model/transactions');

var web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));
var lastSynchedBlock;

const start = async function(){
    const latest = await web3.eth.getBlockNumber();
    //console.log(latest);
    //console.log(lastSynchedBlock)
    var counter=0;
    for(let i = process.env.BLOCK_LIMIT; i > 0; i--){
        const blockInfo = await web3.eth.getBlock(latest-i);
        if(blockInfo.transactions[0]!=null){
            //console.log(blockInfo.transactions);
            const transactionCount = await web3.eth.getBlockTransactionCount(latest-i);
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
        counter++;
    }
    //update last synched block's number here for further syncing
    console.log(counter);
    console.log(latest);
}

freshSyncRouter.route('/')
.get((req,res,next) => {
    start()
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json("Sync completed, database updated!");
    })
    .catch(err => {
    console.log(err);
    res.status(500).send("Error");
    })
});

module.exports = freshSyncRouter;