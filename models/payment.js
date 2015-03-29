var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix    = require('../config/config').db.prefix;
var tableName = prefix + 'payment';

var attributes = {
  id           : {type: Sequelize.INTEGER, primaryKey: true},
  name         : {type: Sequelize.STRING},
  type         : {type: Sequelize.BOOLEAN},
  class_name   : {type: Sequelize.STRING},
  description  : {type: Sequelize.TEXT},
  logo         : {type: Sequelize.STRING},
  status       : {type: Sequelize.BOOLEAN},
  order        : {type: Sequelize.INTEGER},
  note         : {type: Sequelize.TEXT},
  poundage     : {type: Sequelize.DECIMAL(15, 2)},
  poundage_type: {type: Sequelize.BOOLEAN},
  config_param : {type: Sequelize.INTEGER},
  client_type  : {type: Sequelize.BOOLEAN}
};

var Payment = sequelize.define('Payment', attributes, {
  timestamps: false,
  tableName: tableName
});

module.exports = Payment;