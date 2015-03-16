var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix = require('../config/config').db.prefix;
var tableName = prefix + 'goods_photo';

var arrtibutes = {
  id: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING
  }
};

var ProductPhoto = sequelize.define('ProductPhoto', arrtibutes, {
  timestamps: false,
  tableName: tableName
});

module.exports = ProductPhoto;
