var User = require('../models/user.js');
var Order = require('../models/order.js');
var OrderProduct = require('../models/orderProduct.js');
var Address = require('../models/address.js');
var Cart = require('../models/cart.js');
var Delivery = require('../models/delivery.js');
var Payment = require('../models/payment.js');
var Areas = require('../models/areas.js');
var util = require('./util.js');
var config = require('../config/config.js');
var _ = require('underscore');
var request = require('request');
var Promise = require('promise');
var formate = require('date-util');

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
      },
      order: 'create_time DESC'
    });
  },

  confirmUserOrder: function (userId, orderId, callback) {
    return Order.find({
      where: {
        user_id: userId,
        id: orderId,
        if_del: 0
      }
    }).then(function (order) {
      if (order) {
        order.status = 5;
        order.completion_time = new Date();
        order.distribution_status = 1;
        return order.save();
      }
    });
  },

  getOrderDetailByUserAndId: function (userId, orderId) {
    return Order.find({
      where: {
        user_id: userId,
        id: orderId,
        if_del: 0
      }
    }, {raw: true}).then(function (order) {
      if (order) {
        order.content = getDisplayAddress(order);
        var promises = [];
        promises.push(OrderProduct.findAll({where: {order_id: order.id}}, {raw: true}));
        promises.push(Delivery.findAll({where: {id: order.distribution}}, {raw: true}));
        promises.push(Payment.findAll({where: {id: order.pay_type}}, {raw: true}));
        return Promise.all(promises).then(function (data) {
          order.products = _.map(data[0], function (item) {
            item.name = JSON.parse(item.goods_array).name;
            return item;
          });
          order.delivery = data[1][0].name;
          order.payment = data[2][0].name;
          return order;
        })
      }
      return;
    });
  },

  getAreas: function (callback) {
    var self = this;
    callback = callback || util.noop;
    if (self.areasData) {
      callback(self.areasData);
    } else {
      Areas.findAll().then(function (results) {
        self.areasData = [];
        for (var i = 0; i < results.length; i++) {
          var temp = results[i];
          self.areasData.push({
            area_id: temp.area_id,
            parent_id: temp.parent_id,
            area_name: temp.area_name
          });
        }
        callback(self.areasData);
      })
    }
  },

  getUserAddresses: function (userId) {
    return Address.findAll({
      where: {
        user_id: userId
      }
    }).then(function (results) {
      var data = [];
      for (var i = 0; i < results.length; i++) {
        var temp = results[i];
        data.push({
          id: temp.id,
          content: getDisplayAddress(temp),
          default: temp.default,
          accept_name: temp.accept_name,
          mobile: temp.mobile,
          detail: getAddressDetail(temp)
        });
      };
      return data;
    });
  },

  getUserAddressForOrder: function (userId, specificAddressId) {
    if (specificAddressId) {
      return this.getAddressById(specificAddressId, userId, true).then(function (result) {
        var address;
        if (result) {
          address = {
            id: result.id,
            accept_name: result.accept_name,
            mobile: result.mobile,
            detail: getAddressDetail(result)
          }
        }
        return address;
      })
    }
    return this.getUserAddresses(userId).then(function (results) {
      if (results && results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].default == 1) {
            return results[i];
          }
        };
        return results[0];
      }
      return null;
    })
  },

  getUserDefaultAddress: function (userId) {
    return Address.find({
      where: {
        id: userId,
        default: true
      }
    }).then(function (result) {
      if (result) {
        var address = {
          id: result.id,
          accept_name: result.accept_name,
          mobile: result.mobile,
          detail: getAddressDetail(result)
        }
        return address;
      }
      return null;
    });
  },

  getAddressById: function (id, userId, raw) {
    raw = raw || false;
    var options = {
      where: {
        id: id
      }
    };
    if (userId) {
      options.where.user_id = userId;
    }
    return Address.find(options, {raw: raw});
  },

  createAddress: function (address) {
    return Address.create(address);
  },

  updateAddress: function (address) {
    return Address.upsert(address);
  },

  removeAddress: function (id, userId) {
    return this.getAddressById(id, userId).then(function (address) {
      if (address) {
        return address.destroy().then(function (result) {
          return result;
        });
      } else {
        return null;
      }
    })
  },

  sendCodeToMobile: function (mobile, type, callback) {
    var url = config.APIHost;
    switch(type) {
      case "reg":
        url += "/index.php?controller=messageauthentication&action=sendCodeToValidate&tel="
        break;
      case "resetPassword":
        url += "/index.php?controller=messageauthentication&action=sendCodeToValidateWhenForgotPassword&tel="
        break;
    }
    url += mobile;
    request(url, callback);
  }
};

userService.getAreas(function () {
  console.log("cache areas ok!", userService.areasData.length);
});

var getAddressDetail = function (obj) {
  var str = '';
  var temp = [obj.province, obj.city, obj.area];
  temp = temp.map(function (value) {
    var data = _.find(userService.areasData, function (item) {
      return item.area_id === value;
    })
    return data.area_name;
  })
  str += temp.join(' ');
  str += ' ' + obj.address;
  return str;
}
var getDisplayAddress = function (obj) {
  if (userService.areasData) {
    var str = obj.accept_name + ' ';
    var temp = [obj.province, obj.city, obj.area];
    temp = temp.map(function (value) {
      var data = _.find(userService.areasData, function (item) {
        return item.area_id === value;
      })
      return data.area_name;
    })
    str += temp.join('');
    str += ' ' + obj.address + ' ' + obj.mobile;
    return str;
  }
}

module.exports = userService;
