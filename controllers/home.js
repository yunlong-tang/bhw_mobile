var Product = request('../models/product.js');

var home = {
  index: function (req, res, next) {
    Product.findAll().then(function (result) {
      res.send(result);
    })
  }
}

module.exports = home;