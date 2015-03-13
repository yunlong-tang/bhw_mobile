var Product = require('../models/product.js');

var home = {
  index: function (req, res, next) {
    Product.findAll().then(function (result) {
      console.log(result[0].sellPrice);
      res.render('site/index', {
        title: "test",
        products: result
      });
    })
  }
}

module.exports = home;