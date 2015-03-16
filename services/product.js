var Product = require('../models/product.js');
var ProductPhoto = require('../models/productPhoto');
var ProductPhotoRelation = require('../models/productPhotoRelation');

var productService = {
  getProductDetailById: function(id) {
    return Product.find({
      where: {
        id: id
      },
      include: [{
        model: ProductPhotoRelation,
        include: [{
          model: ProductPhoto
        }]
      }]
    });
  }
};

module.exports = productService;
