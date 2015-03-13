var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix = require('../config/config').db.prefix;
var tableName = prefix + 'goods';

var arrtibutes = {
  name: {
    type: Sequelize.STRING
  },
  sellPrice: {
    type: Sequelize.DECIMAL(15,2),
    field: "sell_price"
  },
  img: {
    type: Sequelize.STRING
  },
  isDel: {
    type: Sequelize.BOOLEAN,
    field: "is_del"
  },

};

var Product = sequelize.define(tableName, arrtibutes, {
  timestamps: false
});

module.exports = Product;
