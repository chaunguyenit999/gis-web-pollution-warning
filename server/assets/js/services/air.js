(function ($) {
  // utils function
  let formatDate = (date) => {
    return date.substring(0, date.length - 5);
  };

  // Load data to table
  var dataTable = $("#example").DataTable({
    dom: "lBfrtip",
    buttons: [
      {
        className: "insert-btn",
        text: " <i class='fas fa-plus'></i> Thêm",
      },
      {
        extend: "collection",
        text: " <i class='fas fa-regular fa-eye-slash'></i> Ẩn/Hiện cột",
        buttons: [
          // các checkbox ở
        ],
      },
      {
        extend: "collection",
        text: "<i class='fas fa-exchange-alt'></i> Chuyển",
        buttons: [
          {
            text: "Dữ liệu không khí</a>",
            action: function () {
              window.location.href = "/admin/management/env-data/stations/air";
            },
          },
          {
            text: "Dữ liệu đất</a>",
            action: function () {
              window.location.href = "/admin/management/env-data/stations/soil";
            },
          },
          {
            text: "Dữ liệu nước",
            action: function () {
              window.location.href =
                "/admin/management/env-data/stations/water";
            },
          },
        ],
      },
      {
        className: "open-file-modal",
        text: " <i class='fas fa-file-import'></i> Nhập",
      },
      {
        extend: "collection",
        text: "<i class='fas fa-file-export'></i> Xuất",
        buttons: [
          {
            extend: "copy",
            text: "Sao chép",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // chỉ xuất các cột 0, 1, 3
            },
            title: null,
          },
          {
            extend: "csv",
            text: "Định dạng CSV",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // chỉ xuất các cột 0, 1, 3
            },
            title: null,
          },
          {
            extend: "excel",
            text: "Định dạng Excel",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // chỉ xuất các cột 0, 1, 3
            },
            title: null,
          },
          {
            extend: "print",
            text: "In",
            charset: "utf-8", // thêm cấu hình mã hóa UTF-8
            bom: true, // thêm ký tự bom
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // chỉ xuất các cột 0, 1, 3
            },
            title: null,
          },
        ],
      },
    ],
    responsive: true,
    autoWidth: false,
    processing: true,
    serverSide: true,
    searching: true,
    searchDelay: 300,
    lengthMenu: [
      [10, 25, 50, 100, 1000, 10000, -1],
      [10, 25, 50, 100, 1000, 10000, "All"],
    ],
    order: [],
    language: {
      search: "",
      searchPlaceholder: "Tìm kiếm",
      processing: "Đang xử lý...",
      lengthMenu: "Hiển thị _MENU_ bản ghi trên mỗi trang",
      zeroRecords: "Không tìm thấy dữ liệu",
      info: "Hiển thị trang _PAGE_ của _PAGES_",
      infoEmpty: "Không có dữ liệu để hiển thị",
      infoFiltered: "(được lọc từ _MAX_ bản ghi)",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Tiếp theo",
        previous: "Trước",
      },
    },

    ajax: {
      url: "/admin/management/env-data/stations/air/datatables",
      type: "POST",
      data: { actionType: "getAllData" },
      dataType: "json",
    },
    columns: [
      { data: "_id", name: "Id" },
      { data: "address", name: "Địa chỉ", width: "20%", orderable: false },
      { data: "latitude", name: "Latitude" },
      { data: "longitude", name: "Longitude" },
      { data: "date", name: "Ngày giờ" },
      { data: "wind_degree", name: "Độ gió" },
      { data: "humidity", name: "Độ ẩm" },
      { data: "wind_speed", name: "Tốc độ gió" },
      { data: "wind_dust", name: "Bụi mịn" },
      { data: "sulfur_dioxide", name: "SO2" },
      { data: "nito_dioxit", name: "NO2" },
      { data: "result", name: "Định mức" },
      {
        // Thêm cột "Action"
        orderable: false,
        data: null,
        name: "Hành Động",
        render: function (data, type, row) {
          return `
            <div class="d-flex justify-content-center">
              <!-- EDIT BTN -->
              <span>
                <a href="#" class="text-info table-edit-btn" id="${row._id}">
                  <i class="fas fa-pencil-alt"></i>
                </a>
              </span>
              <!-- DELETE BTN -->
              <span>
                <a href="#" class="text-danger table-delete-btn" id="${row._id}">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </span>
            </div>
          `;
        },
      },
    ],
  });

  // Edit action form is Insert Data
  $(".insert-btn").click(function () {
    $("#table-action-modal").modal("show");
    $("#form-action-modal")[0].reset();
    $("#myLargeModalLabel10").html("Thêm dữ liệu");
    $("#actionType").val("insertData"); // define action
    $(".modal-footer #save").val("Thêm");
  });

  $("#example").on("click", ".table-edit-btn", function () {
    var actionId = $(this).attr("id");
    $("#actionId").val(actionId);

    $.ajax({
      url: "/api/v1/airs/" + actionId,
      type: "GET",
      dataType: "json",
      success: function (res) {
        $("#table-action-modal").modal("show");
        $("#actionType").val("updateDataById"); // define action
        $(".modal-title").html("Sửa dữ liệu");
        $("#save").val("Cập nhật");

        $("#AdressValid").val(res.location.address);
        $("#LatitudeValid").val(res.location.latitude);
        $("#LongitudeValid").val(res.location.longitude);
        $("#DatetimeValid").val(formatDate(res.date));
        $("#WindDegreeValid").val(res.wind_degree);
        $("#HumidityValid").val(res.humidity);
        $("#WindSpeedValid").val(res.wind_speed);
        $("#WindDustValid").val(res.wind_dust);
        $("#SulfurDioxideValid").val(res.sulfur_dioxide);
        $("#NitoDioxideValid").val(res.nito_dioxit);
      },
    });
  });

  $("#table-action-modal").on("hidden.bs.modal", function () {
    $("#actionId").val("");
  });

  // Form Handler
  $("#table-action-modal").on("submit", "#form-action-modal", function (event) {
    event.preventDefault();
    $("#save").attr("disabled", "disabled");

    let address_val = $("#AdressValid").val();
    let lat_val = $("#LatitudeValid").val();
    let long_val = $("#LongitudeValid").val();
    let date_val = $("#DatetimeValid").val();
    let wind_degree_val = $("#WindDegreeValid").val();
    let humidity_val = $("#HumidityValid").val();
    let wind_speed_val = $("#WindSpeedValid").val();
    let wind_dust_val = $("#WindDustValid").val();
    let sulfur_dioxide_val = $("#SulfurDioxideValid").val();
    let nito_dioxide_val = $("#NitoDioxideValid").val();
    let actionData = {
      location: {
        address: address_val,
        latitude: lat_val,
        longitude: long_val,
      },
      date: date_val,
      wind_degree: wind_degree_val,
      humidity: humidity_val,
      wind_speed: wind_speed_val,
      wind_dust: wind_dust_val,
      sulfur_dioxide: sulfur_dioxide_val,
      nito_dioxit: nito_dioxide_val,
    };

    let actionType = $("#actionType").val();
    if ($("#actionId").val()) {
      actionId = $("#actionId").val();
      actionData._id = actionId;
    }

    console.log(actionData);

    $.ajax({
      url: "/admin/management/env-data/stations/air/datatables",
      type: "POST",
      dataType: "json",
      data: { actionData: actionData, actionType: actionType },
      success: function (res) {
        event.preventDefault();
        $("#form-action-modal")[0].reset();
        $("#table-action-modal").modal("toggle");
        $("#save").attr("disabled", false);
        if (actionType == "insertData") {
          Swal.fire(
            "Thêm thành công!",
            "Bản ghi đã được thêm vào CSDL",
            "success"
          );
        } else {
          Swal.fire(
            "Cập nhật thành công!",
            "Bản ghi đã được cập nhật vào CSDL",
            "success"
          );
        }
        dataTable.ajax.reload();
      },
      error: function (xhr, status, error) {
        Swal.fire({
          icon: "error",
          title: status,
          text: error,
          footer: '<a href="">Hãy nhập lại thông tin chính xác!</a>',
        });
      },
    });
  });

  $("#example").on("click", ".table-delete-btn", function () {
    var actionId = $(this).attr("id");
    // sweetalert2
    Swal.fire({
      title: "Xác nhận xoá",
      text: "Bản ghi sẽ bị xoá và không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f64e60",
      cancelButtonColor: "#1e3d73",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "/admin/management/env-data/stations/air/datatables",
          type: "POST",
          data: { actionId: actionId, actionType: "delDataById" },
          dataType: "json",
          success: function (res) {
            Swal.fire(
              "Xoá thành công!",
              "Bản ghi đã được xoá khỏi CSDL",
              "success"
            );
            dataTable.ajax.reload();
          },
          error: function (xhr, status, error) {
            Swal.fire({
              icon: "error",
              title: status,
              text: error,
              footer: '<a href="">Hãy nhập lại thông tin chính xác!</a>',
            });
          },
        });
      } else {
        return false;
      }
    });
  });

  $("#file-modal-handler").on("hidden.bs.modal", function () {
    $("#actionId").val(null);
    $(".custom-file-input")
      .siblings(".custom-file-label")
      .removeClass("selected")
      .html("Choose file");
  });

  // FILE IMPORT
  $(".open-file-modal").click(function () {
    $("#file-modal-handler").modal("show");
    $(".show-file-sheet").hide();
    $("#customFile").val(null);
    $("#show-file-sheet").val(null);
  });

  $(".custom-file-input").on("change", function (e) {
    let fileName = $(this).val().split("\\").pop();
    let fileExt = fileName.split(".").pop().toLowerCase();
    // Show file name
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    // Check file type
    if (fileExt === "xlsx") {
      $(".show-file-sheet").show();
      var input = $("#custom-file-input")[0];
      var select = $("#show-file-sheet");
      // Định nghĩa hàm để đọc tệp và tạo danh sách các option
      function readWorkbook() {
        console.log(input.files[0]);
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: "array" });
          var sheetNames = workbook.SheetNames; // Lấy tên của các sheet trong tệp
          $.each(sheetNames, function (index, value) {
            // Tạo các option cho select với giá trị là tên của các sheet
            select.append($("<option>").val(value).text(value));
          });
        };
        reader.readAsArrayBuffer(file);
      }
      select.empty(); // Xóa tất cả các option cũ trong select
      readWorkbook();
    } else if (fileExt === "csv") {
      return;
    } else if (fileExt === "json") {
      return;
    } else {
      $("#customFile").val(null);
      Swal.fire({
        icon: "error",
        title: "File không được hỗ trợ!",
        text: "Định dạng phù hợp: xlxs, csv, json!",
        footer: '<a href="">Hãy nhập lại file</a>',
      });
      return;
    }
  });

  // SUBTABLE HANDLER
  $(".sub-datatable").hide();
  $(".show-sub-datatable").click(function () {
    $(".sub-table").show();
  });

  var subDataTable = $("#bootstraptable").DataTable({
    language: {
      search: "",
      searchPlaceholder: "Tìm kiếm",
      processing: "Đang xử lý...",
      lengthMenu: "Hiển thị _MENU_ bản ghi trên mỗi trang",
      zeroRecords: "Không tìm thấy dữ liệu",
      info: "Hiển thị trang _PAGE_ của _PAGES_",
      infoEmpty: "Không có dữ liệu để hiển thị",
      infoFiltered: "(được lọc từ _MAX_ bản ghi)",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Tiếp theo",
        previous: "Trước",
      },
    },
  });
})(jQuery);
