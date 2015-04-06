var Alipay = require('./lib/alipay.js').Alipay;
var config = require('../config/config');
var alipayConfig = config.alipay;

alipay = new Alipay(alipayConfig);

module.exports = alipay;