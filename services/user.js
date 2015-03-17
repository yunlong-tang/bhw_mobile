var User = require('../models/user.js');
var Order = require('../models/order.js');
var Address = require('../models/address.js');
var Cart = require('../models/cart.js');
var util = require('./util.js');

var userService = {
  loginVerify: function (username, password) {
    return User.findOne({
      where: {
        username: username,
        password: util.md5(password)
      }
    });
  }
};

module.exports = userService;