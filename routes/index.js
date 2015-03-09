var express = require('express');
var router = express.Router();

var users = require('./users');
var categories = require('./categories');
var products = require('./products');

module.exports = {
  init: function(app) {
    var _app = app;

    router.get('/', function(req, res, next) {
      res.render('index', {
        title: 'Express'
      });
    });

    _app.use('/', router);
    _app.use('/users', users);
    _app.use('/categories', categories);
    _app.use('/products', products);
  }
};
