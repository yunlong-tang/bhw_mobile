var userService = require('../services/user.js');
var security = require('../services/security.js');
var productService = require('../services/product');
var siteService = require('../services/site');
var orderService = require('../services/order');
var Sequelize = require('sequelize');
var _ = require('lodash');
var alipay = require('../services/alipay');
var Promise = require('promise');

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
    var id = req.params.id;
    var product = { 
      id: id
    };
    shoppingcart = siteService.removeFromShoppingCart(product, shoppingcart);
    shoppingcart = siteService.encodeShoppingcart(shoppingcart);
    res.cookie("shoppingcart", shoppingcart);
    res.send({
      success: true
    });
  },

  createOrder: function(user, req, res, next) {
    var type = req.query.type;
    var addressId = req.query.address;
    if (type == "cart") {
      var shoppingcart = req.cookies.shoppingcart;
      if (!shoppingcart) throw new Error;

      shoppingcart = siteService.decodeShoppingcart(shoppingcart);
      var promise = []
      promise.push(siteService.getProductsInShoppingCart(shoppingcart));
      promise.push(userService.getUserAddressForOrder(user.id, addressId));
      promise.push(siteService.getSiteDelivery());
      promise.push(siteService.getSitePayment());

      Promise.all(promise).then(function (data) {
        res.render('site/createOrder', {
          title: "确认订单",
          products: data[0],
          address: data[1],
          delivery: data[2] || [],
          payment: data[3] || []
        });
      });
    } else if (type == "directly") {
      
    }
  },

  caculateOrderPrice: function (req, res, next) {
    var delivery_id = req.body.delivery_id;
    var products = req.body.products;
    orderService.countOrderDetail(products, delivery_id).then(function (data) {
      if (data) {
        res.send({
          productsPrice: data.sum,
          deliveryPrice: data.deliveryPrice,
          total: data.final_sum
        });
      } else {
        next({
          api: true,
          message: "计算失败"
        });
      }
    });
  },

  createOrderAction: function (user, req, res, next) {
    var address_id = req.body.address_id;
    var delivery_id = req.body.delivery_id;
    var products = req.body.products;
    var obj = {
      user_id: user.id,
      delivery_id: delivery_id,
      payment: req.body.payment,
      type: req.body.type,
    };
    var promise = [];
    promise.push(userService.getAddressById(address_id));
    promise.push(orderService.countOrderDetail(products, delivery_id));

    Promise.all(promise).then(function (data) {
      var address = data[0];
      obj.accept_name = address.accept_name;
      obj.telphone = address.telphone;
      obj.province = address.province;
      obj.city = address.city;
      obj.area = address.area;
      obj.address = address.address;
      obj.mobile = address.mobile;
      var orderData = data[1];
      obj.orderData = orderData;

      var orderProducts = orderData.orderProducts;
      orderService.createOrder(obj).then(function (order) {
        if (order && orderProducts && orderProducts.length > 0) {
          for (var i = 0; i < orderProducts.length; i++) {
            orderProducts[i].order_id = order.id;
          };
          orderService.createOrderProducts(orderProducts).then(function () {
            res.clearCookie("shoppingcart");
            res.send({
              success: true,
              payment_url: "/site/order/" + order.id + "/purchase"
            });
          });
        } else {
          next({message: "创建订单失败!"});
        }
      });
    })
  },
  
  doPay: function (user, req, res, next) {
    var orderId = req.params.orderId;
    var callback = req.query.callback;
    var data = {
      out_trade_no: orderId,
      subject: "百花味购物",
      total_fee: 0,
      merchant_url: callback || "http://localhost:3000/user"
    };
    orderService.getOrderById(orderId).then(function (order) {
      if (order) {
        data.total_fee = order.order_amount;
        alipay.createDirectPayByWap(data, res);
      } else {
        next({message: "找不到订单!"});
      }
    })
  }
};


var shoppingcartVerify = function (req, res, next) {
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
