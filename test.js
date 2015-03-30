var https = require('https');
    
    var url = "https://wappaygw.alipay.com/service/rest.htm?format=xml&partner=2088811000783341&req_data=<direct_trade_create_req><notify_url>http://localhost:3000/alipay/create_direct_pay_by_wap/notify_url</notify_url><call_back_url>http://localhost:3000/alipay/create_direct_pay_by_wap/return_url</call_back_url><seller_account_name>service@baihuawei.com</seller_account_name><out_trade_no>202381290</out_trade_no><subject>测试</subject><total_fee>0.01</total_fee><merchant_url>http://localhost:3000/product/1</merchant_url></direct_trade_create_req>&req_id=1427737425274&sec_id=MD5&service=alipay.wap.trade.create.direct&v=2.0&sign=571aac1107d353831d6e7d239e1fd215";
    url = encodeURI(url)
    var parsed_url = require('url').parse(url);
    var url2 = "https://wappaygw.alipay.com/service/rest.htm?format=xml&partner=2088811000783341&req_data=%3Cdirect_trade_create_req%3E%3Cnotify_url%3Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/notify_url%3C/notify_url%3E%3Ccall_back_url%3Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/return_url%3C/call_back_url%3E%3Cseller_account_name%3Eservice@baihuawei.com%3C/seller_account_name%3E%3Cout_trade_no%3E202381290%3C/out_trade_no%3E%3Csubject%3E%E6%B5%8B%E8%AF%95%3C/subject%3E%3Ctotal_fee%3E0.01%3C/total_fee%3E%3Cmerchant_url%3Ehttp://localhost:3000/product/1%3C/merchant_url%3E%3C/direct_trade_create_req%3E&req_id=1427737425274&sec_id=MD5&service=alipay.wap.trade.create.direct&v=2.0&sign=571aac1107d353831d6e7d239e1fd215";
    var parsed_url2 = require('url').parse(url2);
    var options = {
        hostname:parsed_url.host,
        path:parsed_url.path,
        method:'GET',
    };


    console.log(parsed_url.path);
    console.log(encodeURI(parsed_url.path));
    console.log(parsed_url2.path);
    // options.path = decodeURI(options.path);
    // console.log(options.path);
    var req = https.request(options, function(res) {
        var responseText='';
        res.on('data', function(chunk){
            responseText += chunk;
        });
        res.on('end', function(){
           console.log(responseText)
        });
    });

    req.end();  

    // /service/rest.htm?format=xml&partner=2088811000783341&req_data=%3Cdirect_trade_create_req%3E%3Cnotify_url%3Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/notify_url%3C/notify_url%3E%3Ccall_back_url%3Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/return_url%3C/call_back_url%3E%3Cseller_account_name%3Eservice@baihuawei.com%3C/seller_account_name%3E%3Cout_trade_no%3E202381290%3C/out_trade_no%3E%3Csubject%3E测试%3C/subject%3E%3Ctotal_fee%3E0.01%3C/total_fee%3E%3Cmerchant_url%3Ehttp://localhost:3000/product/1%3C/merchant_url%3E%3C/direct_trade_create_req%3E&req_id=1427737425274&sec_id=MD5&service=alipay.wap.trade.create.direct&v=2.0&sign=571aac1107d353831d6e7d239e1fd215
    // /service/rest.htm?format=xml&partner=2088811000783341&req_data=%3Cdirect_trade_create_req%3E%3Cnotify_url%3Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/notify_url%3C/notify_url%3E%3Ccall_back_url%3Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/return_url%3C/call_back_url%3E%3Cseller_account_name%3Eservice@baihuawei.com%3C/seller_account_name%3E%3Cout_trade_no%3E202381290%3C/out_trade_no%3E%3Csubject%3E%E6%B5%8B%E8%AF%95%3C/subject%3E%3Ctotal_fee%3E0.01%3C/total_fee%3E%3Cmerchant_url%3Ehttp://localhost:3000/product/1%3C/merchant_url%3E%3C/direct_trade_create_req%3E&req_id=1427737425274&sec_id=MD5&service=alipay.wap.trade.create.direct&v=2.0&sign=571aac1107d353831d6e7d239e1fd215
    // /service/rest.htm?format=xml&partner=2088811000783341&req_data=%253Cdirect_trade_create_req%253E%253Cnotify_url%253Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/notify_url%253C/notify_url%253E%253Ccall_back_url%253Ehttp://localhost:3000/alipay/create_direct_pay_by_wap/return_url%253C/call_back_url%253E%253Cseller_account_name%253Eservice@baihuawei.com%253C/seller_account_name%253E%253Cout_trade_no%253E202381290%253C/out_trade_no%253E%253Csubject%253E%E6%B5%8B%E8%AF%95%253C/subject%253E%253Ctotal_fee%253E0.01%253C/total_fee%253E%253Cmerchant_url%253Ehttp://localhost:3000/product/1%253C/merchant_url%253E%253C/direct_trade_create_req%253E&req_id=1427737425274&sec_id=MD5&service=alipay.wap.trade.create.direct&v=2.0&sign=571aac1107d353831d6e7d239e1fd215
