var Sequelize = require('sequelize');
var sequelize = require('./index');
var format = require('date-util');


var prefix    = require('../config/config').db.prefix;
var tableName = prefix + 'address';

var attributes = {
  user_id    : {type: Sequelize.INTEGER},
  accept_name: {type: Sequelize.STRING},
  zip        : {type: Sequelize.STRING},
  telphone   : {type: Sequelize.STRING},
  country    : {type: Sequelize.INTEGER},
  province   : {type: Sequelize.INTEGER},
  city       : {type: Sequelize.INTEGER},
  area       : {type: Sequelize.INTEGER},
  address    : {type: Sequelize.STRING},
  mobile     : {type: Sequelize.STRING},
  default    : {type: Sequelize.BOOLEAN}
};


var Address = sequelize.define('Address', attributes, {
  timestamps: false,
  tableName: tableName
});

module.exports = Address;