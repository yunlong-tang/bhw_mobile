var productService = require('../services/product');

var productCtrl = {
  show: function (req, res, next) {
    var id = req.params.id;
    productService.getProductDetailById(id).then(function (result) {
      res.render('site/product', {
        title: "商品详情",
        product: result,
        hideFooter: true
      });
    });
  }
}

module.exports = productCtrl;