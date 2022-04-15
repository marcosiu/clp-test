module.exports = function(sequelize, Sequelize) {
    var DeviceSchema = sequelize.define('Device', {
        name: Sequelize.STRING,
        owner: Sequelize.STRING,
        productType: Sequelize.STRING
    },{
        timestamps: false
    });
    return DeviceSchema;
}