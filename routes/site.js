var express = require('express');
var router = express.Router();
var siteCtrl = require('../controllers/site.js');
var userCtrl = require('../controllers/user.js');

router.get('/cart', siteCtrl.transformShoppingcart, siteCtrl.cartList);

router.post('/cart/add', siteCtrl.transformShoppingcart, siteCtrl.addCart);
router.post('/cart/edit', siteCtrl.transformShoppingcart, siteCtrl.editCart);
router.delete('/cart/:id', siteCtrl.transformShoppingcart, siteCtrl.removeCart);

router.get('/order/create', userCtrl.tokenVerify, siteCtrl.createOrder);
router.post('/order/create', userCtrl.tokenVerify, siteCtrl.createOrderAction);
router.post('/caculateOrderPrice', siteCtrl.caculateOrderPrice);

router.get('/order/:orderId/purchase', userCtrl.tokenVerify, siteCtrl.doPay);

module.exports = router;