var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix = require('../config/config').db.prefix;
var tableName = prefix + 'user';

var arrtibutes = {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  headIco: {
    type: Sequelize.STRING,
    field: 'head_ico'
  },
};

var User = sequelize.define('User', arrtibutes, {
  timestamps: false,
  tableName: tableName
});

module.exports = User;
