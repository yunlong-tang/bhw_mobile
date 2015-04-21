(function ($) {
  var template = "<div class=\"app-dialog-container\"> \
      <div class=\"app-dialog\"> \
        <div class=\"title\"><\/div> \
        <div class=\"text\"><\/div> \
        <div class=\"button success\"><\/div>\
        <div class=\"button failed\"><\/div>\
      <\/div>\
      <div class=\"app-toast\">\
        <div class=\"message\">\
        <\/div>\
      <\/div>\
    <\/div>";

  var $title, $text, $success,$failed,$dialog,$containe,$toast;
  var hasInit = false;
  var init = function () {
    $("body").append(template);
    $container = $(".app-dialog-container");
    $dialog = $container.find(".app-dialog");
    $toast = $container.find(".app-toast");
    if ($dialog) {
      hasInit = true;
      $title = $dialog.find(".title");
      $text = $dialog.find(".text");
      $success = $dialog.find(".success");
      $failed = $dialog.find(".failed");
      $message = $toast.find(".message");
    } else {
      hasInit = false;
    }
  };
  var defaultObj = {
    title: "Oops!",
    text: "出错啦~",
    success: "OK"
    // failed: "Cancel"
  };
  var noop = function () {
    $container.fadeOut();
  };
  $.dialog = function (obj, success, failed) {
    success = success || $.noop;
    failed = failed || $.noop;
    if (!hasInit) {
      init();
    }
    obj = $.extend(defaultObj, obj);
    $toast.hide();
    $dialog.show();
    $container.fadeIn();
    $title.text(obj.title || "");
    $text.text(obj.text || "");
    $success.text(obj.success || "").click(noop).click(success);
    $failed.show().text(obj.failed || "").click(noop).click(failed);
    if (!obj.failed) {
      $failed.hide();
    }
  };

  $.toast = function (msg, during) {
    during = during || 1000;
    msg = msg || "系统错误，请稍后再试~";
    if (!hasInit) {
      init();
    }
    $dialog.hide();
    $toast.show();
    $container.fadeIn();
    $message.text(msg);
    setTimeout(function () {
      $container.fadeOut();
    }, during);
  };

  $.noop = function () {};

})(Zepto);

(function ($) {
  var defaults = {
    bottomOffset: 1000,
    url: '',
    autoAppend: true,
    loading: false,
    index: 1,
    size: 10,
    noMore: false
  };
  var $window = $(window);
  $.fn.loadmore = function (options) {
    var self = this;
    self.settings = $.extend({}, defaults, options);
    $window.scroll(function () {
      var bottom = document.body.scrollHeight - document.body.scrollTop - $window.height();
      if (bottom < self.settings.bottomOffset && self.settings.loading == false && self.settings.noMore != true) {
        self.settings.loading = true;
        data = {
          size: self.settings.size,
          offset: self.settings.size * self.settings.index++
        };
        $.ajax({
          url: self.settings.url,
          type: 'GET',
          data: data,
          success: function (data) {
            if (data.length > 0) {
              if (self.settings.autoAppend) {
                $(self).append(data);
              }
            } else {
              self.settings.noMore = true;
            } 
            self.settings.loading = false;
          }
        })
      }
    })
  }
})(Zepto);