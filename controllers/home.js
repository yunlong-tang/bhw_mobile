var productService = require('../services/product.js');
var userService = require('../services/user.js');
var paganation = require('../config/config.js').paganation;

var homeCtrl = {
  index: function (req, res, next) {
    productService.getProducts(paganation.size).then(function (result) {
      res.render('site/index', {
        hideBackButton: true,
        title: "闪购",
        products: result
      });
    })
  },

  getAreas: function (req, res, next) {
    userService.getAreas(function (data) {
      res.send(data);
    })
  }
}

module.exports = homeCtrl;