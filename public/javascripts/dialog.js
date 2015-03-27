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
    success = success || function (){};
    failed = failed || function (){};
    if (!hasInit) {
      init();
    }
    $toast.hide();
    obj = $.extend(defaultObj, obj);
    $container.fadeIn();
    $title.text(obj.title || "");
    $text.text(obj.text || "");
    $success.text(obj.success || "").click(success).click(noop);
    $failed.text(obj.failed || "").click(failed).click(noop);
  };

  $.toast = function (msg) {
    msg = msg || "";
    if (!hasInit) {
      init();
    }
    $dialog.hide();
    $toast.show();
    $container.fadeIn();
    $message.text(msg);
    setTimeout(function () {
      $container.fadeOut();
    }, 1000);
  }
})(Zepto)