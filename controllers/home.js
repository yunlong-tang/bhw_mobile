var Product = require('../models/product.js');
var userService = require('../services/user.js');

var homeCtrl = {
  index: function (req, res, next) {
    Product.findAll().then(function (result) {
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