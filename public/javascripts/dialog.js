(function ($) {
  var template = "<div class=\"app-dialog-container\"> \
      <div class=\"app-dialog\"> \
        <div class=\"title\"><\/div> \
        <div class=\"text\"><\/div> \
        <div class=\"button success\"><\/div>\
        <div class=\"button failed\"><\/div>\
      <\/div>\
    <\/div>";

  var $title, $text, $success,$failed,$dialog;
  var hasInit = false;
  var init = function () {
    $("body").append(template);
    $dialog = $(".app-dialog-container");
    if ($dialog) {
      hasInit = true;
      $title = $dialog.find(".title");
      $text = $dialog.find(".text");
      $success = $dialog.find(".success");
      $failed = $dialog.find(".failed");
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
    $dialog.removeClass("show enable");
  };
  $.dialog = function (obj, success, failed) {
    if (!hasInit) {
      init();
    }
    obj = $.extend(defaultObj, obj);
    $dialog.addClass("show");
    $title.text(obj.title || "");
    $text.text(obj.text || "");
    $success.text(obj.success || "").click(success).click(noop);
    $failed.text(obj.failed || "").click(failed).click(noop);
    setTimeout(function () {
      $dialog.addClass("enable");
    }, 1);
  }
})(Zepto)