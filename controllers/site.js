var userService = require('../services/user.js');
var security = require('../services/security.js');
var productService = require('../services/product');
var siteService = require('../services/site');
var Sequelize = require('sequelize');
var _ = require('lodash');

var siteCtrl = {
  transformShoppingcart: function (req, res, next) {
    var shoppingcart = req.cookies.shoppingcart;
    if (shoppingcart) {
      shoppingcart = siteService.decodeShoppingcart(shoppingcart);
    } else {
      shoppingcart = [];
    }
    next(shoppingcart);
  },

  cartList: function(shoppingcart, req, res, next) {
    var promise = null;
    if (shoppingcart && shoppingcart.length > 0) {
      promise = siteService.getProductsInShoppingCart(shoppingcart);
    }
    if (promise != null) {
      promise.then(function (products) {
        if (!_.isArray(products)) {
          products = [products];
        }
        res.render('site/cart', {
          title: "已选",
          products: products,
          hideBackButton: true
        })
      }) 
      return;
    }
    res.render('site/cart', {
      title: "已选",
      products: null,
      hideBackButton: true
    })
  },
  addCart: function(shoppingcart, req, res, next) {
    shoppingcartVerify(req, res, next);
    var id = req.body.id;
    var num = req.body.num || 1;
    var product = { 
      id: id,
      num: num
    };
    shoppingcart = siteService.addToShoppingCart(product, shoppingcart);
    shoppingcart = siteService.encodeShoppingcart(shoppingcart);
    res.cookie("shoppingcart", shoppingcart);
    res.send({
      success: true
    });
  },
  editCart: function(shoppingcart, req, res, next) {
    shoppingcartVerify(req, res, next);
    var id = req.body.id;
    var num = req.body.num || 1;
    var product = { 
      id: id,
      num: num
    };
    shoppingcart = siteService.editInShoppingCart(product, shoppingcart);
    shoppingcart = siteService.encodeShoppingcart(shoppingcart);
    res.cookie("shoppingcart", shoppingcart);
    res.send({
      success: true
    });
  },
  removeCart: function(shoppingcart, req, res, next) {
    shoppingcartVerify(req, res, next);
    var id = req.body.id;
    var num = req.body.num || 1;
    var product = { 
      id: id,
      num: num
    };
    shoppingcart = siteService.removeFromShoppingCart(product, shoppingcart);
    shoppingcart = siteService.encodeShoppingcart(shoppingcart);
    res.cookie("shoppingcart", shoppingcart);
    res.send({
      success: true
    });
  },

  createOrder: function(user, req, res, next) {
    var type = req.param('type');
    if (type == "cart") {
      var shoppingcart = req.cookies.shoppingcart;
      if (!shoppingcart) throw new Error;

      shoppingcart = siteService.decodeShoppingcart(shoppingcart);
      var promise = []
      promise.push(siteService.getProductsInShoppingCart(shoppingcart));
      promise.push(userService.getUserDefaultAddress(user.id));
      promise.push(siteService.getSiteDelivey());
      promise.push(siteService.getSitePayment());

      Promise.all(promise).then(function (data) {
        res.render('site/createOrder', {
          title: "确认订单",
          products: data[0],
          address: data[1],
          delivery: data[2],
          payment: data[3]
        });
      });
    } else if (type == "directly") {
      
    }
  },
};

shoppingcartVerify = function (req, res, next) {
  var id = req.body.id;
  var num = req.body.num;
  if (isNaN(id) || isNaN(num)) {
    error = new Error;
    error.api = true;
    error.status = 400;
    error.message = "parameters error.";
    throw error;
  }
};

module.exports = siteCtrl;
