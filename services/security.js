var util = require('./util.js');
var config = require('../config/config.js');
var debug = require('debug')(config.appName);
var userService = require('./user.js');

var security = {};

var getUsrInfo = function(req) {
  var cookies = req.cookies;
  var token = cookies.token;
  var userInfo = null;
  if (token) {
    try {
      var userInfo = util.decryptDES(token, config.secret);
      debug("parsed encrypt string: ", userInfo);
      userInfo = JSON.parse(userInfo);
    } catch (e) {
      console.log("DES decryptDES failed!");
    }
  }
  return userInfo;
};
var hasPassedSecurity = function(req, callback) {
  var userInfo = getUsrInfo(req);
  debug("parsed encrypt string: ", userInfo);
  if (userInfo) {
    userService.loginUser(userInfo.username, userInfo.password).then(function(user) {
      if (user) {
        callback(user);
      } else {
        callback(false);
      }
    });
  } else {
    callback(false);
  }
};

security.userAuthenticate = function(req, res, next) {
  debug("server page authenticating....");
  hasPassedSecurity(req, function(result) {
    if (result === true) {
      debug("has passed secuirty limit!", result);
      next();
    } else {

    }
  });
};

security.hasLoginedUser = function(req, callback) {
  hasPassedSecurity(req, callback);
};

security.serializeAuthTicket = function(username, password) {
  var values = {
    username: username,
    password: password
  };
  var val = JSON.stringify(values);
  var signedStr = util.encryptDES(val, config.secret);
  debug("DES encrypted str: ", signedStr);
  return signedStr;
};


module.exports = security;
