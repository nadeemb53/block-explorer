const express = require('express');
const Transactions = require('../model/transactions');
const transactionRouter = express.Router();

transactionRouter.route('/from/:from')
.get((req,res,next) => {
    Transactions.find({"from":req.params.from})
    .then((transaction) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transaction);
    }, (err) => next(err))
    .catch((err) => next(err));
});

transactionRouter.route('/to/:to')
.get((req,res,next) => {
    Transactions.find({"to":req.params.to})
    .then((transaction) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transaction);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = transactionRouter;