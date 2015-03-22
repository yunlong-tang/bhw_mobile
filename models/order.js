var Sequelize = require('sequelize');
var sequelize = require('./index');


var prefix    = require('../config/config').db.prefix;
var tableName = prefix + 'order';

var arrtibutes = {
  order_no           : {type: Sequelize.STRING, field: "order_no"},
  user_id            : {type: Sequelize.INTEGER, field: "user_id"},
  pay_type           : {type: Sequelize.INTEGER, field: "pay_type"},
  distribution       : {type: Sequelize.INTEGER, field: "distribution" },
  status             : {type: Sequelize.BOOLEAN, field: "status"},
  pay_status         : {type: Sequelize.BOOLEAN, field: "pay_status"},
  distribution_status: {type: Sequelize.BOOLEAN, field: "distribution_status"},
  accept_name        : {type: Sequelize.STRING, field: "accept_name"},
  postcode           : {type: Sequelize.STRING, field: "postcode"},
  telphone           : {type: Sequelize.STRING, field: "telphone"},
  country            : {type: Sequelize.INTEGER, field: "country"},
  province           : {type: Sequelize.INTEGER, field: "province"},
  city               : {type: Sequelize.INTEGER, field: "city"},
  area               : {type: Sequelize.INTEGER, field: "area"},
  address            : {type: Sequelize.STRING, field: "address"},
  mobile             : {type: Sequelize.STRING, field: "mobile"},
  payable_amount     : {type: Sequelize.DECIMAL(15,2), field: "payable_amount"},
  real_amount        : {type: Sequelize.DECIMAL(15,2), field: "real_amount"},
  payable_freight    : {type: Sequelize.DECIMAL(15,2), field: "payable_freight"},
  real_freight       : {type: Sequelize.DECIMAL(15,2), field: "real_freight"},
  pay_time           : {type: Sequelize.DATE, field: "pay_time"},
  send_time          : {type: Sequelize.DATE, field: "send_time"},
  create_time        : {type: Sequelize.DATE, field: "create_time"},
  completion_time    : {type: Sequelize.DATE, field: "completion_time"},
  invoice            : {type: Sequelize.BOOLEAN, field: "invoice"},
  postscript         : {type: Sequelize.STRING, field: "postscript"},
  note               : {type: Sequelize.TEXT, field: "note"},
  if_del             : {type: Sequelize.BOOLEAN, field: "if_del"},
  insured            : {type: Sequelize.DECIMAL(15,2), field: "insured"},
  if_insured         : {type: Sequelize.BOOLEAN, field: "if_insured"},
  pay_fee            : {type: Sequelize.DECIMAL(15,2), field: "pay_fee"},
  invoice_title      : {type: Sequelize.STRING, field: "invoice_title"},
  taxes              : {type: Sequelize.DECIMAL(15,2), field: "taxes"},
  promotions         : {type: Sequelize.DECIMAL(15,2), field: "promotions"},
  discount           : {type: Sequelize.DECIMAL(15,2), field: "discount"},
  order_amount       : {type: Sequelize.DECIMAL(15,2), field: "order_amount"},
  prop               : {type: Sequelize.STRING, field: "prop"},
  accept_time        : {type: Sequelize.STRING, field: "accept_time"},
  exp                : {type: Sequelize.DECIMAL(15,2), field: "exp"},
  point              : {type: Sequelize.DECIMAL(15,2), field: "point"},
  type               : {type: Sequelize.BOOLEAN, field: "type"},
  trade_no           : {type: Sequelize.STRING, field: "trade_no"},
  takeself           : {type: Sequelize.INTEGER, field: "takeself"}
};


var Order = sequelize.define('Order', arrtibutes, {
  timestamps: false,
  tableName: tableName
});

module.exports = Order;