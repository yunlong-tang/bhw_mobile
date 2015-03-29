var Sequelize = require('sequelize');
var sequelize = require('./index');

var prefix    = require('../config/config').db.prefix;
var tableName = prefix + 'order_goods';

var attributes = {
  order_id    : {type: Sequelize.INTEGER},
  goods_id    : {type: Sequelize.INTEGER},
  img         : {type: Sequelize.STRING},
  product_id  : {type: Sequelize.INTEGER},
  goods_price : {type: Sequelize.DECIMAL(15, 2)},
  real_price  : {type: Sequelize.DECIMAL(15, 2)},
  goods_nums  : {type: Sequelize.INTEGER},
  goods_weight: {type: Sequelize.DECIMAL(15, 2)},
  goods_array : {type: Sequelize.TEXT}, //'商品和货品名称name和规格value串json数据格式'
  is_send     : {type: Sequelize.BOOLEAN}, //'是否已发货 0:未发货;1:已发货;2:已经退货'
  is_checkout : {type: Sequelize.BOOLEAN}, //'是否给商家结算货款 0:未结算;1:已结算'
  delivery_id : {type: Sequelize.INTEGER}
};

var OrderProduct = sequelize.define('OrderProduct', attributes, {
  timestamps: false,
  tableName: tableName
});

module.exports = OrderProduct;