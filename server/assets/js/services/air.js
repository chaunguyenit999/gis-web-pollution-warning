$(document).ready(function () {
  // Load data to table
  var dataTable = $("#example").DataTable({
    processing: true,
    serverSide: true,
    searching: true,
    searchDelay: 300,
    lengthMenu: [
      [5, 10, 20, 40, -1],
      [5, 10, 20, 40, "All"],
    ],
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
    responsive: true,
    // order: [],
    ajax: {
      url: "/admin/management/env-data/stations/air/datatables",
      type: "POST",
      data: { action: "getAllData" },
      dataType: "json",
    },
    columns: [
      { data: "_id", name: "Id" },
      { data: "address", name: "Địa chỉ", width: "300px" },
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
        data: null,
        name: "Hành Động",
        render: function (data, type, row) {
          return `
            <div class="d-flex justify-content-center">
              <!-- EDIT BTN -->
              <span>
                <a href="#" class="table-edit-btn text-info" data-toggle="modal"
                  data-target=".edit-form" id="${row._id}">
                  <i class="fas fa-pencil-alt"></i>
                </a>
              </span>
              <!-- DELETE BTN -->
              <span>
                <a href="#" class="text-danger table-delete-btn" data-toggle="modal"
                  data-target=".delete-form" id="${row._id}">
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
    $(".modal-title").html("Thêm dữ liệu");
    $("#action").val("insertData");
    $(".modal-footer #save").val("Thêm");
  });

  // Form Handler
  $(".table-action-modal").on("submit", ".form-action-modal", function (event) {
    event.preventDefault();
    $("#save").attr("disabled", "disabled");
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
      url: "/admin/management/env-data/stations/air/datatables",
      type: "POST",
      data: formData,
      success: function (data) {
        $(".form-action-modal")[0].reset();
        $(".table-action-modal").modal("hide");
        $("#save").attr("disabled", false);
        dataTable.ajax.reload();
      },
    });
  });

  $("#example").on("click", ".table-delete-btn", function () {
    var deleteId = $(this).attr("id");
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
          data: { deleteId: deleteId, action: "delDataById" },
          dataType: "json",
          success: function (data) {
            Swal.fire("Đã xoá!", "Bản ghi đã được xoá", "success");
            dataTable.ajax.reload();
          },
          error: function () {
            alert("Xảy ra lỗi khi xoá!");
          },
        });
      } else {
        return false;
      }
    });
  });

  

  

  // t.on("draw", function () {
  //   //setting the next and prev buttons with active or disabled state

  //   //setting the index column with values.
  //   t.column(0, { search: "applied", order: "applied" })
  //     .nodes()
  //     .each(function (cell, i) {
  //       cell.innerHTML = i + 1;
  //     });
  // });
  // //paging
  // $("#next").on("click", function () {
  //   t.page("next").draw("page");
  // });

  // $("#previous").on("click", function () {
  //   t.page("previous").draw("page");
  // });


  $("#example").DataTable();
});
