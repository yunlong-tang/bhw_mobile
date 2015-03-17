var util = {};
var crypto = require('crypto');

util.md5 = function (str) {
  var md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
}

module.exports = util;