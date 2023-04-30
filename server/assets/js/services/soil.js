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
      .done((res) => {
        // update ui again
        let html = `<tr id="` + res._id + `" class="table-success text-dark">
                      <td>(New)</td>
                      <td>` + res.location.address + `</td>
                      <td>` + res.location.latitude + `</td>
                      <td>` + res.location.longitude + `</td>
                      <td>` + res.date + `</td>
                      <td>` + res.exchange_acidity + `</td> 
                      <td>` + res.total_nitrogen + `</td>
                      <td>` + res.total_photpho + `</td>
                      <td>` + res.total_kali + `</td>
                      <td>` + res.calci + `</td>
                      <td>` + res.magie + `</td>
                      <td>` + res.zinc + `</td>
                      <td>` + res.plumbum + `</td>
                      <td>` + res.copper + `</td>
                      <td>` + res.arsenic + `</td>
                      <td>` + res.result + `</td>
                      <td>
                          <div class="d-flex justify-content-center">
                              <!-- EDIT BTN -->
                              <span data-toggle="tooltip tooltip-btn" data-placement="top" title="Edit">
                                  <a href="#" class="table-edit-btn text-info" data-toggle="modal"
                                      data-target=".edit-form" data-actionid="` + res._id + `">
                                      <i class="fas fa-pencil-alt"></i>
                                  </a>
                              </span>
                              <!-- DELETE BTN -->
                              <span data-toggle="tooltip tooltip-btn" data-placement="top" title="Delete">
                                  <a href="#" class="text-danger table-delete-btn" data-toggle="modal"
                                      data-target=".delete-form" data-actionid="` + res._id + `">
                                      <i class="fas fa-trash-alt"></i>
                                  </a>
                              </span>
                          </div>
                      </td>
                    </tr>`;

        $(".insert-form").modal("toggle");
        
        setTimeout(function () {
          $(".editable-table tbody").prepend(html);
        }, 250);

        $("#AdressValid").val("");
        $("#LatitudeValid").val("");
        $("#LongitudeValid").val("");
        $("#DatetimeValid").val("");
        $("#Phkclvalid").val("");
        $("#NitoValid").val("");
        $("#PhophoValid").val("");
        $("#KaliValid").val("");
        $("#CanxiValid").val("");
        $("#MagieValid").val("");
        $("#ZnValid").val("");
        $("#PbValid").val("");
        $("#CuValid").val("");
        $("#AsValid").val("");
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
        let lat_val = Number($(".edit-form").find("#LatitudeValid").val());
        let long_val = Number($(".edit-form").find("#LongitudeValid").val());
        let date_val = $(".edit-form").find("#DatetimeValid").val();
        let exchange_acidity = Number($(".edit-form").find("#Phkclvalid").val());
        let total_nitrogen = Number($(".edit-form").find("#NitoValid").val());
        let total_photpho = Number($(".edit-form").find("#PhophoValid").val());
        let total_kali = Number($(".edit-form").find("#KaliValid").val());
        let calci = Number($(".edit-form").find("#CanxiValid").val());
        let magie = Number($(".edit-form").find("#MagieValid").val());
        let zinc = Number($(".edit-form").find("#ZnValid").val());
        let plumbum = Number($(".edit-form").find("#PbValid").val());
        let copper = Number($(".edit-form").find("#CuValid").val());
        let arsenic = Number($(".edit-form").find("#AsValid").val());

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
          .done((res) => {
            $(".edit-form").modal("toggle");
            let rowDelete = ".editable-table tbody #" + res._id;
            setTimeout(function () {
              $(rowDelete).addClass("table-warning text-dark");

              $(rowDelete).find("td").eq(0).html("(Edited)");
              $(rowDelete).find("td").eq(1).html(res.location.address);
              $(rowDelete).find("td").eq(2).html(res.location.latitude);
              $(rowDelete).find("td").eq(3).html(res.location.longitude);
              $(rowDelete).find("td").eq(4).html(res.date);
              $(rowDelete).find("td").eq(5).html(res.exchange_acidity);
              $(rowDelete).find("td").eq(6).html(res.total_nitrogen);
              $(rowDelete).find("td").eq(7).html(res.total_photpho);
              $(rowDelete).find("td").eq(8).html(res.total_kali);
              $(rowDelete).find("td").eq(9).html(res.calci);
              $(rowDelete).find("td").eq(10).html(res.magie);
              $(rowDelete).find("td").eq(11).html(res.zinc);
              $(rowDelete).find("td").eq(12).html(res.plumbum);
              $(rowDelete).find("td").eq(13).html(res.copper);
              $(rowDelete).find("td").eq(14).html(res.arsenic);
              $(rowDelete).find("td").eq(15).html(res.result);
              $(rowDelete).find("td").eq(16).html(`<div class="d-flex justify-content-center">
                                                      <!-- EDIT BTN -->
                                                      <span data-toggle="tooltip tooltip-btn" data-placement="top" title="Edit">
                                                          <a href="#" class="table-edit-btn text-info" data-toggle="modal"
                                                              data-target=".edit-form" data-actionid="` + res._id + `">
                                                              <i class="fas fa-pencil-alt"></i>
                                                          </a>
                                                      </span>
                                                      <!-- DELETE BTN -->
                                                      <span data-toggle="tooltip tooltip-btn" data-placement="top" title="Delete">
                                                          <a href="#" class="text-danger table-delete-btn" data-toggle="modal"
                                                              data-target=".delete-form" data-actionid="` + res._id + `">
                                                              <i class="fas fa-trash-alt"></i>
                                                          </a>
                                                      </span>
                                                    </div>`);
              event.preventDefault();
            }, 150);
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
