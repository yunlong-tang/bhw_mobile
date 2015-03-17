var userService = require('../services/user.js');
var routerConstant = require('../config/router.js');
var userCtrl = {
  index: function(req, res, next) {
    if (!req.cookies.user_id) {
      res.redirect(routerConstant.userLogin);
    }
    res.render("user/index", {
      title: "我的"
    })

  },
  reg: function(req, res, next) {
    res.render("user/reg", {
      title: "注册",
      rightContent: "登录",
      rightHref: routerConstant.userLogin
    })
  },

  regAction: function (req, res, next) {
    
  },

  login: function(req, res, next) {
    res.render("user/login", {
      title: "登录",
      rightContent: "注册",
      rightHref: routerConstant.userReg
    });
  },
  loginAction: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    userService.loginVerify(username, password).then(function (user) {
      if (user) {
        console.log(user);
        res.cookie('user_id', username);
        res.redirect(routerConstant.userIndex);
      } else {  
        res.redirect(routerConstant.userLogin);
      }
    });
  },

  forget: function(req, res, next) {
    res.render("user/forget", {
      title: "忘记密码",
      rightContent: "登录",
      rightHref: routerConstant.userLogin
    })
  },
  forgetAction: function (req, res, next) {
    
  },
  orderList: function(req, res, next) {

  },
  orderDetail: function(req, res, next) {

  },
  addressList: function(req, res, next) {

  },
  addressAdd: function(req, res, next) {

  },
  addressEdit: function(req, res, next) {

  },
};

module.exports = userCtrl;
