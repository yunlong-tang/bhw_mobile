var express = require('express');
var router = express.Router();

var users = require('./users');
var categories = require('./categories');
var products = require('./products');

var homeCtrl = require('../controllers/home');

module.exports = {
  init: function(app) {
    var _app = app;

    router.get('/', homeCtrl.index);

    _app.use('/', router);
    _app.use('/users', users);
    _app.use('/categories', categories);
    _app.use('/products', products);
  }
};
