var userService = require('../services/user.js');
var routerConstant = require('../config/router.js');
var security = require('../services/security.js');
// var util = require('../services/util.js');

var userCtrl = {
  index: function(user, req, res, next) {
    res.render("user/index", {
      title: "我的",
      user: user
    })
  },
  reg: function(req, res, next) {
    res.render("user/reg", {
      title: "注册",
      rightContent: "登录",
      rightHref: routerConstant.userLogin
    })
  },

  regAction: function(req, res, next) {

  },

  login: function(req, res, next) {
    res.render("user/login", {
      hideBackButton: true,
      title: "登录",
      rightContent: "注册",
      rightHref: routerConstant.userReg
    })
  },
  loginAction: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    userService.loginUser(username, password).then(function(user) {
      if (user) {
        var token = security.serializeAuthTicket(username, password);
        res.cookie("token", token, {
          expires: new Date(Date.now() + 24 * 60 * 3600)
        });
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
      rightHref: routerConstant.userLogin
    })
  },
  forgetAction: function(req, res, next) {

  },
  orderList: function(user, req, res, next) {
    userService.getUserOrderList(user.id).then(function (orders) {
      console.log(orders.length);
      orders = orders || [];
      res.render("user/orderList", {
        title: "我的订单",
        orders: orders
      });
    });
  },
  orderDetail: function(req, res, next) {

  },
  addressList: function(user, req, res, next) {

  },
  addressAdd: function(req, res, next) {

  },
  addressEdit: function(req, res, next) {

  },
  tokenVerify: function(req, res, next) {
    security.hasLoginedUser(req, function(result) {
      if (result) {
        next(result);
      } else {
        res.clearCookie("token");
        res.redirect(routerConstant.userLogin);
      }
    })
  },

  specialTokenVerify: function(req, res, next) {
    security.hasLoginedUser(req, function(result) {
      if (result === true) {
        res.redirect(routerConstant.userIndex);
      } else {
        next();
      }
    })
  }
};

module.exports = userCtrl;
