var express = require('express');
var router = express.Router();

var users = require('./users');
var categories = require('./categories');
var products = require('./products');
var site = require('./site');

var homeCtrl = require('../controllers/home');

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
  }
};
