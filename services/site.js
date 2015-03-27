var util = require('./util');
var config = require('../config/config.js');

var siteService = {
  encodeShoppingcart: function (obj) {
    return util.encryptDES(obj, config.secret);
  },

  decodeShoppingcart: function (str) {
    var obj = util.decryptDES(str, config.secret);
    obj = JSON.parse(obj);
    return obj;
  },

};

module.exports = siteService;