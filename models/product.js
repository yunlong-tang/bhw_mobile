var sequelize = require('./index');

var prefix = require('../config/config').db.prefix;
var tableName = prefix + 'goods';

var Product = sequelize.define(tableName, {

}, {
  timestamps: false
});

module.exports = Product;
