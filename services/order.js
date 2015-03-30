var util = require('./util');
var formate = require('date-util');
var productService = require('./product');
var siteService = require('./site');
var _ = require('lodash');
var Order = require('../models/order.js');
var OrderProduct = require('../models/orderProduct');

var orderService = {
  generateOrderNo: function() {
    var str = new Date().format("yyyymmddHHMMss");
    str += util.random(100000, 999999);
    return str;
  },

  countOrderDetail: function (products, deliveryId) {
    var orderData = {};
    var exp = 0;
    var point = 0;
    var weight = 0;
    var sum = 0;
    var final_sum = 0;
    var promise = [];
    var ids = [];
    for (var i = 0; i < products.length; i++) {
      ids.push(products[i].id);
    };
    promise.push(productService.getProductsWithIds(ids));
    promise.push(siteService.getDeliveryById(deliveryId, true));

    return Promise.all(promise).then(function (data) {
      var oProducts = data[0];
      var orderProducts = [];
      for (var i = 0; i < oProducts.length; i++) {
        var temp = _.find(products, function (item) {
          return item.id == oProducts[i].id;
        });
        var num = 0;
        if (temp) {
          num = temp.num;
        }
        exp += oProducts[i].exp;
        point += oProducts[i].point;
        weight += oProducts[i].calcWeight * num;
        sum += oProducts[i].sellPrice * num;
        final_sum += oProducts[i].sellPrice * num;

        var orderProductItem = {
          goods_id: oProducts[i].id,
          img: oProducts[i].img,
          goods_price: oProducts[i].sellPrice,
          real_price: oProducts[i].sellPrice,
          goods_nums: num,
          goods_weight: oProducts[i].calcWeight,
          goods_array: JSON.stringify({name: oProducts[i].name, goodsno: oProducts[i].goods_no, value: ''}),
          delivery_id: deliveryId,
          product_id: 0,
          is_send: 0,
          is_checkout: 0

        }
        orderProducts.push(orderProductItem);
      };
      orderData.exp = exp;
      orderData.point = point;
      orderData.weight = weight;
      orderData.sum = sum;
      orderData.final_sum = final_sum;
      orderData.orderProducts = orderProducts;

      var delivery = data[1];
      var firstWeight = delivery.first_weight;
      var secondWeight = delivery.second_weight;
      var firstPrice = delivery.first_price;
      var secondPrice = delivery.second_price;
      var delivery_fee = firstPrice;

      var leftWeight = weight - firstWeight;
      if (leftWeight > 0) {
        var number = Math.round(leftWeight / secondWeight);
        delivery_fee += secondPrice * number;
      }
      orderData.deliveryPrice = delivery_fee;
      return orderData;
    });
  },

  createOrderProducts: function (orderProducts) {
    return OrderProduct.bulkCreate(orderProducts);
  },

  getOrderById: function (id) {
    return Order.find({where: {
      id: id
    }});
  },

  createOrder: function(obj) {
    var order = {
      'order_no'       : this.generateOrderNo(),
      'user_id'        : obj.user_id,
      'accept_name'    : obj.accept_name,
      'pay_type'       : obj.payment,
      'distribution'   : obj.delivery_id,
      'telphone'       : obj.telphone,
      'province'       : obj.province,
      'city'           : obj.city,
      'area'           : obj.area,
      'address'        : obj.address,
      'mobile'         : obj.mobile,
      'create_time'    : new Date(),
      'type'           : obj.type, //0.普通订单,1.团购2.抢购
      
      'accept_time'    : "任意",
      //红包道具
      'prop'           : null,
      
      //商品价格
      'exp'            : obj.orderData.exp,
      'point'          : obj.orderData.point,
      'payable_amount' : obj.orderData.sum,
      'real_amount'    : obj.orderData.final_sum,
      
      //运费价格
      'payable_freight': obj.orderData.deliveryPrice,
      'real_freight'   : obj.orderData.deliveryPrice,
      
      //手续费
      'pay_fee'        : 0,
      
      //税金
      'invoice'        : 0,
      'invoice_title'  : null,
      'taxes'          : 0,
      
      //优惠价格
      'promotions'     : 0,
      
      //订单应付总额
      'order_amount'   : obj.orderData.final_sum,
      
      //订单保价
      'if_insured'     : 0,
      'insured'        : 0,
      
      //自提点ID
      'takeself'       : 0
    };
    return Order.create(order);
  }
};

module.exports = orderService;