function initAddressSelection(params) {
  var $province = $('#province');
  var $city = $('#city');
  var $area = $('#area');
  getAreasData(function(areasData) {
    var areasData = areasData;
    var provinces = areasData.filter(function(item) {
      return item.parent_id == 0;
    });
    var data = [new Option("-- 请选择 省(直辖市) --")];
    for (var i = 0; i < provinces.length; i++) {
      var item = provinces[i];
      data.push(new Option(item.area_name, item.area_id));
    };
    $province.append(data).on("change", function(event) {
      var id = $(this).val();
      var results = areasData.filter(function(item) {
        return item.parent_id == id;
      })
      var data = [new Option("-- 请选择 城市 --")];
      for (var i = 0; i < results.length; i++) {
        data.push(new Option(results[i].area_name, results[i].area_id));
      };
      $city.html(data);
      $area.html(new Option("-- 请选择 城区 --"));
    });
    var cityData = [new Option("-- 请选择 城市 --")];
    if (params && params.length > 0) {
      var results = areasData.filter(function(item) {
        return item.parent_id == params[0];
      })
      for (var i = 0; i < results.length; i++) {
        cityData.push(new Option(results[i].area_name, results[i].area_id));
      };
    }
    $city.append(cityData).on('change', function(event) {
      var id = $(this).val();
      var results = areasData.filter(function(item) {
        return item.parent_id == id;
      })
      var data = [new Option("-- 请选择 城市 --")];
      for (var i = 0; i < results.length; i++) {
        data.push(new Option(results[i].area_name, results[i].area_id));
      };
      $area.html(data);
    });

    var areaData = [new Option("-- 请选择 城区 --")];
    if (params && params.length > 0) {
      var results = areasData.filter(function(item) {
        return item.parent_id == params[1];
      })
      for (var i = 0; i < results.length; i++) {
        areaData.push(new Option(results[i].area_name, results[i].area_id));
      };
    }
    $area.append(areaData);
    if (params && params.length > 0) {
      $province.val(params[0]);
      $city.val(params[1]);
      $area.val(params[2]);
    }
  });
};

var areasData = null;

function getAreasData(callback) {
  if (areasData) {
    callback(areasData);
    return;
  }
  $.get('/areas', function(data) {
    areasData = data;
    callback(data);
  });
}

function joinCart(id, num, success, error) {
  success = success || $.noop;
  error = error || success;
  var data = {
    id: id,
    num: num,
  }
  $.ajax({
    url: '/site/cart/add',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: success,
    error: error
  })
}

function editCart(id, num, success, error) {
  success = success || $.noop;
  error = error || success;
  var data = {
    id: id,
    num: num,
  }
  $.ajax({
    url: '/site/cart/edit',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: success,
    error: error
  })
}

function removeCart(id, success, error) {
  success = success || $.noop;
  error = error || success;
  $.ajax({
    url: '/site/cart/' + id,
    type: 'DELETE',
    dataType: 'json',
    contentType: 'application/json',
    success: success,
    error: error
  })
}

function createOrder(data, success, error) {
  success = success || $.noop;
  error = error || success;
  var url = "/site/order/create";
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: success,
    error: error
  })
}

function getMobileCode(mobile, type, callback) {
  var url;
  switch (type) {
    case VerifyCodeType.Reg:
      url = '/user/mobilecode/reg';
      break;
    case VerifyCodeType.ResetPassword:
      url = 'user/mobilecode/resetPassword'
      break;
  }
  url += '?mobile=' + mobile;
  $.get(url, callback);
}

function caculateTotal() {
  var total = 0;
  $(".item").each(function() {
    var price = $(this).data('price');
    var num = $(this).data('num');
    total += price * num;
  })
  return total.toFixed(2);
};

var constants = {
  addCartSuccessTitle: "添加成功!",
  addCartSuccessText: "产品已成功添加到购物车 :)",
  addCartSuccessBtn1: "继续购物",
  addCartSuccessBtn2: "去结算",
  confirm: "我确定",
  cancel: "点错了",
  logoutTitle: "退出提示!",
  logoutText: "您确定退出登录么?",
  cartDeleteTip: "确定删除该商品么?",
}
var VerifyCodeType = {
  "Reg": 0,
  "ResetPassword": 1
}
