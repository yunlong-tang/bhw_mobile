var express = require('express');
var router = express.Router();

var users = require('./users');
var categories = require('./categories');
var products = require('./products');
var site = require('./site');
var api = require('./api');

var homeCtrl = require('../controllers/home');

var alipay = require('../payment/alipay.js');

module.exports = {
  init: function(app) {
    var _app = app;

    router.get('/', homeCtrl.index);
    router.get('/areas', homeCtrl.getAreas);

    _app.use('/', router);
    _app.use('/user', users);
    _app.use('/category', categories);
    _app.use('/product', products);
    _app.use('/site', site);
    _app.use('/api', api);
    
    alipay.route(_app);
  }
};
