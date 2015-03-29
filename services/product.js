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
  },

  getProductsWithIds: function (ids, isRaw) {
    isRaw = isRaw || false;
    return Product.findAll({
      where: {
        id: {
          in: ids
        }
      },
      attributes: ['id', 'name', 'img', 'sellPrice']
    }, {raw: isRaw});
  }
};

module.exports = productService;
