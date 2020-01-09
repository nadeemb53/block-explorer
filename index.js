require('dotenv').config();
var express = require("express");
var app = express();
var port = 3000;
var mongoose = require("mongoose");
var transactionRouter = require("./router/transactionRouter");
var freshSyncRouter = require("./router/freshSyncRouter");
var quickSyncRouter = require("./router/quickSyncRouter");
 
app.get("/", (req, res) => {
 res.send("Block Explorer");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});

//mongod --dbpath=data --bind_ip 127.0.0.1
const url = 'mongodb://localhost:27017/block-explorer';
const connect = mongoose.connect(url, {useNewUrlParser:true});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use('/user/transactions', transactionRouter);
app.use('/dev/freshSync', freshSyncRouter);
app.use('/dev/quickSync', quickSyncRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});