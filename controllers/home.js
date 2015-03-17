var Product = require('../models/product.js');

var homeCtrl = {
  index: function (req, res, next) {
    Product.findAll().then(function (result) {
      console.log(result[0].sellPrice);
      res.render('site/index', {
        title: "闪购",
        products: result
      });
    })
  }
}

module.exports = homeCtrl;