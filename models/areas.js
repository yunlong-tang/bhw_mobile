var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix    = require('../config/config').db.prefix;
var tableName = prefix + 'areas';

var attributes = {
  area_id  : {type: Sequelize.INTEGER, primaryKey: true},
  parent_id: {type: Sequelize.INTEGER},
  area_name: {type: Sequelize.STRING},
  sort     : {type: Sequelize.INTEGER}
};

var Areas = sequelize.define('Areas', attributes, {
  timestamps: false,
  tableName: tableName
});

module.exports = Areas;