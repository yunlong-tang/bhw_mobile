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
  },
  exp: {
    type: Sequelize.INTEGER
  },
  point: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.DECIMAL(15,2)
  },
  unit: {
    type: Sequelize.DECIMAL(15,2)
  },
  goods_no: {
    type: Sequelize.STRING
  },
  store_nums: {
    type: Sequelize.INTEGER
  }
};

var Product = sequelize.define('Product', attributes, {
  timestamps: false,
  tableName: tableName,
  getterMethods: {
    calcWeight: function () {
      if (this.unit == "kg") {
        return this.weight * 1000;
      } else if (this.unit == "g") {
        return this.weight;
      } else {
        return this.weight;
      }
    }
  }
});

Product.hasMany(ProductPhotoRelation, {foreignKey: 'goods_id'});

ProductPhotoRelation.belongsTo(ProductPhoto, {foreignKey: 'photo_id'});

module.exports = Product;
