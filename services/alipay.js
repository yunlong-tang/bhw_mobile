var Alipay = require('node-alipay-wap').Alipay;
var config = require('../config/config');
var alipayConfig = config.alipay;

alipay = new Alipay(alipayConfig);

var service = {
  createDirectPayByWap: function(data, res) {
    alipay.create_direct_pay_by_wap(data, res);
  }
};

alipay.on('verify_fail', function () {
  console.log(arguments);
})
.on('create_direct_pay_by_wap_trade_finished', function(out_trade_no, trade_no){
  console.log(arguments);
})
.on('create_direct_pay_by_wap_trade_success', function(out_trade_no, trade_no){
  console.log(arguments);
});  

module.exports = service;
