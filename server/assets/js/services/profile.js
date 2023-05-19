(function ($) {
  $("#user-update-info").submit(function (event) {
    event.preventDefault();
    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const password = $("#password").val();

    const data = {
      fullname: fullname,
      email: email,
      password: password,
    };

    console.log(data);

    $.ajax({
      url: "/admin/login/auth", 
      type: "POST",
      data: data,
      success: function (data) {

      },
      error: function () {
        // Xử lý khi xác thực thất bại
        alert("Cập nhật thất bại!");
      },
    });
  });
})(jQuery);
