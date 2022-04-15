//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var Device = require('../models').Device;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const API = 'http://localhost:3000'

chai.use(chaiHttp);
describe('Devices', () => {
    beforeEach((done) => {

        Device.destroy({
            where: {}
        }).then(result => {
            done();  
        });     
    });

  /*
  * Test the /GET route
  */
    describe('/GET devices', () => {
        it('Get all devices', (done) => {
            chai.request(API)
                .get('/devices')
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.length.should.be.eql(0);
                done();
                });
        });
    });
  /*
  * Test the /POST route
  */
    describe('/POST devices', () => {
        it('Create device', (done) => {
        chai.request(API)
            .post('/devices')
            .send({
                "name": "req.body.name",
                "owner": "req.body.owner",
                "productType": "req.body.productType"
            })
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name');
                    res.body.should.have.property('owner');
                    res.body.should.have.property('productType');
                done();
            });
        });
    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id Device', () => {
        it('GET a device by id', (done) => {
            Device.create({ 
                "name": "req.body.name",
                "owner": "req.body.owner",
                "productType": "req.body.productType"
            }).then(device => {
                chai.request(API)
            .get(`/devices/${device.id}` )
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('owner');
                    res.body.should.have.property('productType');
                    res.body.should.have.property('id').eql(device.id);
                    done();
            });
            
            });
        });
    });

    describe('/PUT/:id device', () => {
        it(' UPDATE a device by id', (done) => {
            Device.create({ 
                "name": "req.body.name",
                "owner": "req.body.owner",
                "productType": "req.body.productType"
            }).then(device => {
                chai.request(API)
                .put(`/devices/${device.id}`)
                .send({
                    "name": "req.body.name1",
                    "owner": "req.body.owner1",
                    "productType": "req.body.productType1"
                })
                .end((err, res) => {
                        res.should.have.status(200);
                        done();
                });
            });
        });
    });
    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id device', () => {
        it('DELETE a device given the id', (done) => {
            Device.create({
                "name": "req.body.name",
                "owner": "req.body.owner",
                "productType": "req.body.productType"
            }).then(device => {
                chai.request(API)
                .delete(`/devices/${device.id}`)
                .end((err, res) => {
                        res.should.have.status(200);
                        done(); 
                });
            });
        });
    });
});