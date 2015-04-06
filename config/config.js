var config = {
  "db": {
    "database": "bhw_pc",
    "username": "root",
    "password": "",
    "prefix": "kz_"
  },
  "secret": "kuaizhi_baihuawei",
  "appName": "bhw_modile",
  "defaultIcon": "/images/user_ico.gif",
  // "APIHost": "http://www.baihuawei.com",
  "APIHost": "http://localhost",
  "forgetAPI": "/index.php?controller=simple&action=mobile_forgotPassword_act",
  "regAPI": "/index.php?controller=simple&action=mobile_reg_act",
  "confirmOrderAPI": "/index.php?controller=ucenter&action=order_status",
  "alipay": {
    "partner": "2088811000783341",
    "key": "q17y1y8yl0fjk4nbj5kvkcseneaqrm3j",
    "seller_email": "service@baihuawei.com",
    "host": "http://192.168.1.100:3000/",
    // "cacert": "",
    "transport": "http",
    "input_charset": "utf-8",
    "create_direct_pay_by_wap_redirect_url": "user/order"
  },
  "paymentSubject": "百花味购物",
  "defaultCallback": "http://localhost:3000/user"
}

module.exports = config;