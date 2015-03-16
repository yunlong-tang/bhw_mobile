var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product');

/* GET users listing. */
router.get('/:id', productCtrl.show);

// router.get('/:id/detail', productCtrl.showDetail);

module.exports = router;
