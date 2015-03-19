var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.js');


router.get('/', userCtrl.tokenVerify, userCtrl.index);

router.get('/login', userCtrl.specialTokenVerify, userCtrl.login);
router.post('/login', userCtrl.loginAction);

router.get('/logout', userCtrl.logout);

router.get('/reg', userCtrl.specialTokenVerify, userCtrl.reg);
router.post('/reg', userCtrl.regAction);

router.get('/forget', userCtrl.specialTokenVerify, userCtrl.forget);
router.post('/forget', userCtrl.forgetAction);

router.get('/orders', userCtrl.tokenVerify, userCtrl.orderList);
router.get('/addresses', userCtrl.tokenVerify, userCtrl.addressList);


module.exports = router;
