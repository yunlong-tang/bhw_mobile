var userService = require('../services/user.js');
var security = require('../services/security.js');
var site = require('../services/site');

var cartCtrl = {
  index: function(req, res, next) {
    var shoppingcart = req.cookies.shoppingcart;

    var test = [{
      id: 2,
      num: 5
    }];
    var test = JSON.stringify(test);
    var str = site.encodeShoppingcart(test);
    var a = site.decodeShoppingcart(str);
    console.log(a);
    res.render("site/cart", {
      title: "已选",
      products:a 
    })
    // security.hasLoginedUser(req, function (user) {
    //   if (user) {

    //   } else {

    //   }
    //   res.render("site/cart", {
    //     title: "已选",
    //     products: 
    //   })
    // });
  }  ,
  add: function(req, res, next) {
    // body...
  },
  edit: function(req, res, next) {
    // body...
  },
  remove: function(req, res, next) {
    // body...
  },
  purchase: function(user, req, res, next) {
    // body...
  },
};

module.exports = cartCtrl;
