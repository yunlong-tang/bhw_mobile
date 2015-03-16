var express = require('express');
var router = express.Router();
var cartCtrl = require('../controllers/cart.js');

router.get('/', cartCtrl.index);

module.exports = router;