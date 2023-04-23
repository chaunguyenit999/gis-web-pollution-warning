$(document).ready(function () {
  // INSERT FORM HANDLE
  $("#insertForm").on("submit", function (e) {
    e.preventDefault();

    let address_val = $("#AdressValid").val();
    let lat_val = $("#LatitudeValid").val();
    let long_val = $("#LongitudeValid").val();
    let date_val = $("#DatetimeValid").val();
    let phkhcl_val = $("#Phkclvalid").val();
    let nito_valid = $("#NitoValid").val();
    let photpho_val = $("#PhophoValid").val();
    let kali_val = $("#KaliValid").val();
    let canxi_va = $("#CanxiValid").val();
    let magie_val = $("#MagieValid").val();
    let zn_val = $("#ZnValid").val();
    let pb_val = $("#PbValid").val();
    let cu_val = $("#CuValid").val();
    let as_val = $("#AsValid").val();

    let request = {
      url: "http://localhost:8080/api/v1/soils",
      type: "POST",
      data: {
        location: {
          address: address_val,
          latitude: lat_val,
          longitude: long_val,
        },
        date: date_val,
        exchange_acidity: phkhcl_val,
        total_nitrogen: nito_valid,
        total_photpho: photpho_val,
        total_kali: kali_val,
        calci: canxi_va,
        magie: magie_val,
        zinc: zn_val,
        plumbum: pb_val,
        copper: cu_val,
        arsenic: as_val,
      },
    };

    $.ajax(request)
      .done(() => {
        location.reload();
      })
      .fail(() => {
        alert("Tạo mới thất bại!");
      });
  });

  // UPDATE FORM HANDLE
  $(".edit-form").on("show.bs.modal", function (event) {
    let soilId = $(event.relatedTarget).data("actionid");
    let formatDate = (date) => {
      return date.substring(0, date.length - 5);
    };
    // get data from modal (https://stackoverflow.com/questions/5896287/jquery-passing-value-from-one-input-to-another)
    let request = {
      url: `http://localhost:8080/api/v1/soils/${soilId}`,
      type: "GET",
    };
    $.when(
      // Get data record by id
      $.ajax(request).done(function (response) {
        $(".edit-form").find("#AdressValid").val(response.location.address);
        $(".edit-form").find("#LatitudeValid")
          .val(Number(response.location.latitude));
        $(".edit-form")
          .find("#LongitudeValid")
          .val(Number(response.location.longitude));
        $(".edit-form").find("#DatetimeValid").val(formatDate(response.date));
        $(".edit-form")
          .find("#Phkclvalid")
          .val(Number(response.exchange_acidity));
        $(".edit-form").find("#NitoValid").val(Number(response.total_nitrogen));
        $(".edit-form")
          .find("#PhophoValid")
          .val(Number(response.total_photpho));
        $(".edit-form").find("#KaliValid").val(Number(response.total_kali));
        $(".edit-form").find("#CanxiValid").val(Number(response.calci));
        $(".edit-form").find("#MagieValid").val(Number(response.magie));
        $(".edit-form").find("#ZnValid").val(Number(response.zinc));
        $(".edit-form").find("#PbValid").val(Number(response.plumbum));
        $(".edit-form").find("#CuValid").val(Number(response.copper));
        $(".edit-form").find("#AsValid").val(Number(response.arsenic));
      })
    ).then(() => {
      // Handle Update form
      $("#updateForm").on("submit", function (e) {
        e.preventDefault();

        let address_val = $(".edit-form").find("#AdressValid").val();
        let lat_val = $(".edit-form").find("#LatitudeValid").val();
        let long_val = $(".edit-form").find("#LongitudeValid").val();
        let date_val = $(".edit-form").find("#DatetimeValid").val();
        let exchange_acidity = $(".edit-form").find("#Phkclvalid").val();
        let total_nitrogen = $(".edit-form").find("#NitoValid").val();
        let total_photpho = $(".edit-form").find("#PhophoValid").val();
        let total_kali = $(".edit-form").find("#KaliValid").val();
        let calci = $(".edit-form").find("#CanxiValid").val();
        let magie = $(".edit-form").find("#MagieValid").val();
        let zinc = $(".edit-form").find("#ZnValid").val();
        let plumbum = $(".edit-form").find("#PbValid").val();
        let copper = $(".edit-form").find("#CuValid").val();
        let arsenic = $(".edit-form").find("#AsValid").val();

        let request = {
          url: `http://localhost:8080/api/v1/soils/${soilId}`,
          type: "PUT",
          data: {
            location: {
              address: address_val,
              latitude: lat_val,
              longitude: long_val,
            },
            date: date_val,
            exchange_acidity: exchange_acidity,
            total_nitrogen: total_nitrogen,
            total_photpho: total_photpho,
            total_kali: total_kali,
            calci: calci,
            magie: magie,
            zinc: zinc,
            plumbum: plumbum,
            copper: copper,
            arsenic: arsenic,
          },
        };

        $.ajax(request)
          .done(() => {
            location.reload();
          })
          .fail(() => {
            alert("Cập nhật thất bại!");
          });
      });
    });
  });

  // DELETE RECORD HANDLE
  $(".table-delete-btn").on("click", function (e) {
    let soilId = $(this).data("actionid");
    // DELETE REQUEST
    let request = {
      url: `http://localhost:8080/api/v1/soils/${soilId}`,
      type: "DELETE",
    };
    $.ajax(request).done(() => {
      location.reload();
    });
  });
});
