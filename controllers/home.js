var Product = require('../models/product.js');

var home = {
  index: function (req, res, next) {
    Product.findAll().then(function (result) {
      res.render('index', {
        title: "test",
        data: result
      });
    })
  }
}

module.exports = home;