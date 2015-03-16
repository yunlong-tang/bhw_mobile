var Sequelize = require('sequelize');
var sequelize = require('./index');
// var Product = require('./product.js');

var prefix = require('../config/config').db.prefix;
var tableName = prefix + 'goods_photo_relation';

var arrtibutes = {
  productId: {
    type: Sequelize.INTEGER,
    field: "goods_id",
    // references: Product
  },
  photoId: {
    type: Sequelize.STRING,
    field: "photo_id"
  }
};

var ProductPhotoRelation = sequelize.define("ProductPhotoRelation", arrtibutes, {
  timestamps: false,
  tableName: tableName
});



module.exports = ProductPhotoRelation;
  