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

  getProducts: function (size, offset) {
    size = size || 999;
    offset = offset || 0;
    return Product.findAll({
      where: {
        is_del: 0,
        store_nums: {
          gt: 0
        }
      },
      order: "sort DESC",
      limit: size,
      offset: offset
    });
  },

  getProductsWithIds: function (ids, isRaw) {
    isRaw = isRaw || false;
    return Product.findAll({
      where: {
        id: {
          in: ids
        }
      }
    }, {raw: isRaw});
  }
};

module.exports = productService;
