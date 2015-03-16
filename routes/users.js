var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.js');


router.get('/', userCtrl.index);

router.get('/login', userCtrl.login);
router.post('/login', userCtrl.loginAction);
router.get('/reg', userCtrl.reg);
router.post('/reg', userCtrl.regAction);
router.get('/forget', userCtrl.forget);
router.post('/forget', userCtrl.forgetAction);

router.get('/orders', userCtrl.orderList);
router.get('/addresses', userCtrl.addressList);


module.exports = router;
