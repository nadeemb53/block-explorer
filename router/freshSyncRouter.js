const express = require('express');
const freshSyncRouter = express.Router();
require('dotenv').config();
var Web3 = require('web3');
const Transactions = require('../model/transactions');

var web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));

const start = async function(){
    const latest = await web3.eth.getBlockNumber();
    //console.log(latest);
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
    }
    //update last synched block's number here for further syncing
    global.lastSynchedBlock = latest-i-1;
}

freshSyncRouter.route('/')
.get((res,next) => {
    start()
    .console.log("Synching blocks, please wait, this might take a while...")
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json("Sync Done");
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = freshSyncRouter;