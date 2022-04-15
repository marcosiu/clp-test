var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var port = 3000;

// models
var models = require("./models");

// routes
var devices = require('./routes/devices');

//Sync Database
models.sequelize.sync().then(function () {
    console.log('connected to database')
}).catch(function (err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// register routes
app.use('/devices', devices);

// index path
app.get('/', function (req, res) {
    console.log('app listening on port: ' + port);
    res.send({ message: "Devices API" })
});

app.listen(port, function () {
    console.log('app listening on port: ' + port);
});