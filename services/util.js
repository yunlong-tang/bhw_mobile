var util = {};
var crypto = require('crypto');

var _encryptDES = function(cryptkey, iv, cleardata) {
  var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
    encoded = encipher.update(cleardata, 'utf8', 'base64');
  encoded += encipher.final('base64');
  return encoded;
};
var _decryptDES = function(cryptkey, iv, secretdata) {
  var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
    decoded = decipher.update(secretdata, 'base64', 'utf8');

  decoded += decipher.final('utf8');
  return decoded;
};

util.encryptDES = function(data, secret) {
  var cryptkey = crypto.createHash('sha256').update(secret).digest();
  return _encryptDES(cryptkey, "1234567890000000", data);
};

util.decryptDES = function(data, secret) {
  var cryptkey = crypto.createHash('sha256').update(secret).digest();

  return _decryptDES(cryptkey, '1234567890000000', data);
};

util.md5 = function(str) {
  var md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
}

module.exports = util;
