var userService = require('../services/user.js');
var routerConstant = require('../config/router.js');
var security = require('../services/security.js');
var config = require('../config/config');
var http = require('http');
// var util = require('../services/util.js');

var userCtrl = {
  index: function(user, req, res, next) {
    res.render("user/index", {
      title: "我的",
      user: user,
      hideBackButton: true
    })
  },
  reg: function(req, res, next) {
    res.render("user/reg", {
      title: "注册",
      rightContent: "登录",
      rightHref: routerConstant.userLogin,
      hideBackButton: true
    })
  },

  regAction: function(req, res, next) {

  },

  login: function(req, res, next) {
    var callback = req.query.callback;
    if (callback) {
      callback = encodeURIComponent(callback);
    }
    res.render("user/login", {
      hideBackButton: true,
      title: "登录",
      rightContent: "注册",
      rightHref: routerConstant.userReg,
      callback: callback
    })
  },
  loginAction: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var callback = req.query.callback;
    userService.loginUser(username, password).then(function(user) {
      if (user) {
        var token = security.serializeAuthTicket(username, password);
        res.cookie("token", token, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        if (callback) {
          res.redirect(callback);
          return;
        }
        res.redirect(routerConstant.userIndex);
      } else {
        res.redirect(routerConstant.userLogin);
      }
    });
  },
  logout: function(req, res, next) {
    res.clearCookie("token");
    res.redirect(routerConstant.userLogin);
  },

  forget: function(req, res, next) {
    res.render("user/forget", {
      title: "忘记密码",
      rightContent: "登录",
      rightHref: routerConstant.userLogin,
      hideBackButton: true
    })
  },
  forgetAction: function(req, res, next) {

  },
  orderList: function(user, req, res, next) {
    userService.getUserOrderList(user.id).then(function (orders) {
      orders = orders || [];
      for (var i = 0; i < orders.length; i++) {
        var action = orders[i].action;
        if (action == 1) {
          orders[i].actionText = "支付";
          orders[i].actionUrl = '/site/order/' + orders[i].id + '/purchase';
        } else if (action ==2){
          orders[i].actionText = "确认收货";
          
        }
      };
      res.render("user/orderList", {
        title: "我的订单",
        orders: orders
      });
    });
  },
  orderDetail: function(req, res, next) {

  },
  addressList: function(user, req, res, next) {
    userService.getUserAddresses(user.id).then(function (addresses) {
      addresses = addresses || [];
      res.render('user/addressList', {
        title: "我的地址",
        addresses: addresses
      })
    })
  },
  addressCreate: function(user, req, res, next) {
    res.render('user/addressEdit', {
      title: "新增地址"
    });
  },
  addressCreateAction: function (user, req, res, next) {
    var address = {
      user_id: user.id,
      accept_name: req.body.accept_name,
      mobile: req.body.mobile,
      province: req.body.province,
      city: req.body.city,
      area: req.body.area,
      address: req.body.address
    };
    userService.createAddress(address).then(function (address) {
      if (address) {
        res.redirect(routerConstant.addressList);
      }
    });
  },
  addressEdit: function(user, req, res, next) {
    userService.getAddressById(req.params.id).then(function (address) {
      res.render('user/addressEdit', {
        title: "编辑地址",
        address: address
      });
    })
  },
  addressEditAction: function () {
    
  },

  tokenVerify: function(req, res, next) {
    var callback = req.query.callback;
    security.hasLoginedUser(req, function(result) {
      if (result) {
        next(result);
      } else {
        res.clearCookie("token");
        var callback = encodeURIComponent(req.originalUrl);
        res.redirect(routerConstant.userLogin + "?callback=" + callback);
        
      }
    })
  },

  specialTokenVerify: function(req, res, next) {
    security.hasLoginedUser(req, function(result) {
      if (result) {
        res.redirect(routerConstant.userIndex);
      } else {
        next();
      }
    })
  },

  getMobileCode: function (req, res, next) {
    var type = req.params.type;
    var mobile = req.query.mobile;
    userService.sendCodeToMobile(mobile, type, function(err, response, body) {
      if (!err) {
        res.send({
          success: true,
          message: JSON.parse(body)
        })
      }
    });

  }
};

module.exports = userCtrl;
