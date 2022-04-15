var express = require('express');
var Device = require('../models').Device;
var router = express.Router();

router.get('/', function (req, res) {
    console.log('getting all devices');
    Device.findAll().then(devices => {
        res.json(devices);
    });
});

router.get('/:id', function (req, res) {
    console.log('getting device ' + req.params.id);
    Device.findByPk(req.params.id).then(device => {
        console.log(device);
        res.json(device);
    });
});

router.post('/', function (req, res) {
    Device.create({
        name: req.body.name,
        owner: req.body.owner,
        productType: req.body.productType
    }).then(device => {
        console.log(device.get({
            plain: true
        }));
        res.send(device);
    });
});

router.put('/:id', function (req, res) {
    Device.update({
        name: req.body.name,
        owner: req.body.owner,
        productType: req.body.productType
    }, {
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', function (req, res) {
    Device.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;