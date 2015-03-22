var User = require('../models/user.js');
var Order = require('../models/order.js');
var Address = require('../models/address.js');
var Cart = require('../models/cart.js');
var Order = require('../models/order.js');
var util = require('./util.js');
var config = require('../config/config.js');

var userService = {
  loginUser: function (username, password) {
    return User.findOne({
      where: {
        username: username,
        password: util.md5(password)
      }
    }).then(function (user) {
      if (user == null) {
        return null;
      }
      if (!user.headIco) {
        user.headIco = config.defaultIcon;
      }
      return user;
    });
  },

  getUserOrderList: function (userId) {
    return Order.findAll({
      where: {
        user_id: userId,
        if_del: 0
      }
    });
  }
};

module.exports = userService;