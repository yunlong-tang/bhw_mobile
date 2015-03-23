var Sequelize = require('sequelize');
var sequelize = require('./index');
var ProductPhotoRelation = require('./productPhotoRelation.js');
var ProductPhoto = require('./productPhoto.js');

var prefix = require('../config/config').db.prefix;
var tableName = prefix + 'goods';

var attributes = {
  name: {
    type: Sequelize.STRING
  },
  sellPrice: {
    type: Sequelize.DECIMAL(15,2),
    field: "sell_price"
  },
  marketPrice: {
    type: Sequelize.DECIMAL(15,2),
    field: "market_price"
  },
  costPrice: {
    type: Sequelize.DECIMAL(15,2),
    field: "cost_price"
  },
  img: {
    type: Sequelize.STRING
  },
  isDel: {
    type: Sequelize.BOOLEAN,
    field: "is_del"
  },
  content: {
    type: Sequelize.TEXT
  }
};

var Product = sequelize.define('Product', attributes, {
  timestamps: false,
  tableName: tableName
});

Product.hasMany(ProductPhotoRelation, {foreignKey: 'goods_id'});

ProductPhotoRelation.belongsTo(ProductPhoto, {foreignKey: 'photo_id'});

module.exports = Product;
