function initAddressSelection (params) {
  var $province = $('#province');
  var $city = $('#city');
  var $area = $('#area');
  getAreasData(function (areasData) {
    var areasData = areasData;
    var provinces = areasData.filter(function (item) {return item.parent_id == 0;});
    var data = [new Option("-- 请选择 省(直辖市) --")];
    for (var i = 0; i < provinces.length; i++) {
      var item = provinces[i];
      data.push(new Option(item.area_name, item.area_id));
    };
    $province.append(data).on("change", function (event) {
      var id = $(this).val();
      var results = areasData.filter(function (item) {
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
      var results = areasData.filter(function (item) {
        return item.parent_id == params[0];
      })
      for (var i = 0; i < results.length; i++) {
        cityData.push(new Option(results[i].area_name, results[i].area_id));
      };
    }
    $city.append(cityData).on('change', function (event) {
      var id = $(this).val();
      var results = areasData.filter(function (item) {
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
      var results = areasData.filter(function (item) {
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
function getAreasData (callback) {
  if (areasData) {
    callback(areasData);
    return;
  } 
  $.get('/areas', function (data) {
    areasData = data;
    callback(data);
  });
}

function getMobileCode (mobile) {

}

function joinCart () {
  
}