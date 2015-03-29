var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix    = require('../config/config').db.prefix;
var tableName = prefix + 'delivery';

var attributes = {
  id           : {type: Sequelize.INTEGER, primaryKey: true},
  name         : {type: Sequelize.STRING},
  description  : {type: Sequelize.STRING},
  area_groupid : {type: Sequelize.TEXT},
  firstprice   : {type: Sequelize.TEXT},
  secondprice  : {type: Sequelize.TEXT},
  type         : {type: Sequelize.BOOLEAN},
  first_weight : {type: Sequelize.INTEGER},
  second_weight: {type: Sequelize.INTEGER},
  first_price  : {type: Sequelize.DECIMAL(15,2)},
  second_price : {type: Sequelize.DECIMAL(15,2)},
  status       : {type: Sequelize.BOOLEAN},
  sort         : {type: Sequelize.INTEGER},
  is_save_price: {type: Sequelize.BOOLEAN},
  save_rate    : {type: Sequelize.DECIMAL(15,2)},
  low_price    : {type: Sequelize.DECIMAL(15,2)},
  price_type   : {type: Sequelize.BOOLEAN},
  open_default : {type: Sequelize.BOOLEAN},
  is_delete    : {type: Sequelize.BOOLEAN}
};

var Delivery = sequelize.define('Delivery', attributes, {
  timestamps: false,
  tableName: tableName
});

module.exports = Delivery;