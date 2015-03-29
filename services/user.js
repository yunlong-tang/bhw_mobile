var User = require('../models/user.js');
var Order = require('../models/order.js');
var Address = require('../models/address.js');
var Cart = require('../models/cart.js');
var Order = require('../models/order.js');
var Areas = require('../models/areas.js');
var util = require('./util.js');
var config = require('../config/config.js');
var _ = require('underscore');

var areasData = null;

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
  },

  getAreas: function (callback) {
    callback = callback || util.noop;
    if (areasData) {
      callback(areasData);
    } else {
      Areas.findAll().then(function (results) {
        areasData = [];
        for (var i = 0; i < results.length; i++) {
          var temp = results[i];
          areasData.push({
            area_id: temp.area_id,
            parent_id: temp.parent_id,
            area_name: temp.area_name
          });
        }
        callback(areasData);
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
          content: getDisplayAddress(temp)
        });
      };
      return data;
    });
  },

  getUserDefaultAddress: function (userId) {
    return Address.find({
      where: {
        id: userId,
        default: true
      }
    }).then(function (result) {
      var address = {
        accept_name: result.accept_name,
        mobile: result.mobile,
        detail: getAddressDetail(result)
      }
      return address;
    });
  },

  getAddressById: function (id) {
    return Address.find({where: {
      id: id
    }});
  },

  createAddress: function (address) {
    return Address.create(address);
  },

  updateAddress: function (address) {
    return Address.upsert(address);
  },

  removeAddress: function (id) {
    this.getAddressById(id).then(function (address) {
      return address.destroy();
    })
  },

};

userService.getAreas(function () {
  console.log("cache areas ok!");
});

var getAddressDetail = function (obj) {
  var str = '';
  var temp = [obj.province, obj.city, obj.area];
  temp = temp.map(function (value) {
    var data = _.find(areasData, function (item) {
      return item.area_id === value;
    })
    return data.area_name;
  })
  str += temp.join(' ');
  str += ' ' + obj.address;
  return str;
}
var getDisplayAddress = function (obj) {
  if (areasData) {
    var str = obj.accept_name + ' ';
    var temp = [obj.province, obj.city, obj.area];
    temp = temp.map(function (value) {
      var data = _.find(areasData, function (item) {
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
