var Sequelize = require('sequelize');

var dbConfig = require('../config/config.js').db;
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  timezone: '+08:00'
});

module.exports = sequelize;