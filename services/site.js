var util = require('./util');
var config = require('../config/config.js');
var productService = require('./product');
var Delivery = require('../models/delivery');
var Payment = require('../models/payment');
var Order = require('../models/order');

var siteService = {
  encodeShoppingcart: function (obj) {
    obj = JSON.stringify(obj);
    return util.encryptDES(obj, config.secret);
  },

  decodeShoppingcart: function (str) {
    var obj = util.decryptDES(str, config.secret);
    obj = JSON.parse(obj);
    return obj;
  },

  addToShoppingCart: function (product, cart) {
    var found = false;
    for (var i = 0; i < cart.length; i++) {
      if (product.id == cart[i].id) {
        cart[i].num += product.num;
        found = true;
        break;
      }
    };
    if (found) {
      return cart
    }
    var item = {
      id: product.id,
      num: product.num
    };
    cart.push(item);
    return cart;
  },

  editInShoppingCart: function (product, cart) {
    for (var i = 0; i < cart.length; i++) {
      if (product.id == cart[i].id) {
        var item = {
          id: product.id,
          num: product.num
        }
        cart[i] = item; 
        break;
      }
    };
    return cart;
  },

  removeFromShoppingCart: function (product, cart) {
    for (var i = 0; i < cart.length; i++) {
      if (product.id == cart[i].id) {
        cart.splice(i, 1);
        break;
      }
    };
    return cart;
  },
  getProductsInShoppingCart: function (shoppingcart) {
    var ids = [];
    for (var i = 0; i < shoppingcart.length; i++) {
      ids.push(shoppingcart[i].id);
    };
    if (ids.length > 0) {
      return productService.getProductsWithIds(ids, true).then(function (products) {
        for (var i = 0; i < products.length; i++) {
          var product = products[i];
          var found = false;
          for (var j = 0; j < shoppingcart.length; j++) {
            var item = shoppingcart[i];
            if (item.id == product.id) {
              product.num = item.num;
              found = true;
              break;
            }
          };
          if (found) {
            continue;
          }
        };
        return products;
      });
    }
    return null;
  },

  getSitePayment: function  () {
    return Payment.findAll({
      where: {
        status: 0,
        client_type: 2
      }
    }, {raw: true});
  },

  getSiteDelivery: function  () {
    return Delivery.findAll({
      where: {
        is_delete: 0,
        status: 1,
        type: 0
      }
    }, {raw: true});
  },

  getDeliveryById: function (id, isRaw) {
    isRaw = isRaw || false;
    return Delivery.find({
      where: {
        id: id,
        is_delete: 0,
        status: 1 
      }
    }, {raw: isRaw});
  }
};

module.exports = siteService;