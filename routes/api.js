var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api');
/* GET users listing. */
router.get('/getProducts', apiCtrl.getProducts);

module.exports = router;
