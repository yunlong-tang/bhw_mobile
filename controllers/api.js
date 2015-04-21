var productService = require('../services/product');

var apiCtrl = {
  getProducts: function (req, res, next) {
    var size = req.query.size;
    var offset = req.query.offset;
    productService.getProducts(size, offset).then(function (result) {
      res.render('template/product', {
        products: result
      });
    })
  }
}

module.exports = apiCtrl;