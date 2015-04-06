var alipay = require('../payment/alipay.js');
var orderService = require('./order.js');

var service = {
  createDirectPayByWap: function(data, res) {
    alipay.create_direct_pay_by_wap(data, res);
  },

};

alipay.on('verify_fail', function () {
  console.log("verify_fail", arguemnts);
})
.on('create_direct_pay_by_wap_trade_finished', function(out_trade_no, trade_no){
  console.log('create_direct_pay_by_wap_trade_finished', arguments);
  orderService.changeOrderStatus(out_trade_no, 1).then(function () {
    console.log('update order status success');
  }, function () {
    console.log('update order status failed');
  });
})
.on('create_direct_pay_by_wap_trade_success', function(out_trade_no, trade_no){
  console.log('create_direct_pay_by_wap_trade_success', arguments);
  orderService.changeOrderStatus(out_trade_no, 1).then(function () {
    console.log('update order status success');
  }, function () {
    console.log('update order status failed');
  });
});

module.exports = service;
