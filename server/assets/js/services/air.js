$(document).ready(function () {
  // DELETE RECORD HANDLE
  $(".delete-form").on("show.bs.modal", function (event) {
    let airId = $(event.relatedTarget).data("actionid");
    $(".delete-record").on("click", function (e) {
      // create delete request
      let request = {
        url: `http://localhost:8080/api/v1/airs/${airId}`,
        type: "DELETE",
      };

      $.ajax(request).done(() => {
        $(".delete-form").modal("toggle");
        let rowDelete = ".editable-table tbody #" + airId;
        // remove row
        setTimeout(function () {
          $(rowDelete).addClass("outline-badge-danger");
          $(rowDelete).slideUp(500, function () {
            $(rowDelete).remove();
          });
        }, 250);
      });
    });
  })

  // INSERT FORM HANDLE
  $("#insertForm").on("submit", function (e) {
    e.preventDefault();
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

    let request = {
      url: "http://localhost:8080/api/v1/airs",
      type: "POST",
      data: {
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
                      <td>` + res.wind_degree + `</td> 
                      <td>` + res.humidity + `</td>
                      <td>` + res.wind_speed + `</td>
                      <td>` + res.wind_dust + `</td>
                      <td>` + res.nito_dioxit + `</td>
                      <td>` + res.nito_dioxit + `</td>
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
        $("#WindDegreeValid").val("");
        $("#HumidityValid").val("");
        $("#WindSpeedValid").val("");
        $("#WindDustValid").val("");
        $("#SulfurDioxideValid").val("");
        $("#NitoDioxideValid").val("");
      })
      .fail(() => {
        alert("Tạo mới thất bại!");
      });
  });

  // UPDATE FORM HANDLE
  $(".edit-form").on("show.bs.modal", function (event) {
    let airId = $(event.relatedTarget).data("actionid");
    let formatDate = (date) => {
      return date.substring(0, date.length - 5);
    };
    // get data from modal (https://stackoverflow.com/questions/5896287/jquery-passing-value-from-one-input-to-another)
    let request = {
      url: `http://localhost:8080/api/v1/airs/${airId}`,
      type: "GET",
    };
    $.when(
      // Get data record by id
      $.ajax(request).done(function (response) {
        $(".edit-form").find("#AdressValid").val(response.location.address);
        $(".edit-form")
          .find("#LatitudeValid")
          .val(Number(response.location.latitude));
        $(".edit-form")
          .find("#LongitudeValid")
          .val(Number(response.location.longitude));
        $(".edit-form").find("#DatetimeValid").val(formatDate(response.date));
        $(".edit-form")
          .find("#WindDegreeValid")
          .val(Number(response.wind_degree));
        $(".edit-form").find("#HumidityValid").val(Number(response.humidity));
        $(".edit-form")
          .find("#WindSpeedValid")
          .val(Number(response.wind_speed));
        $(".edit-form").find("#WindDustValid").val(response.wind_dust);
        $(".edit-form")
          .find("#SulfurDioxideValid")
          .val(Number(response.sulfur_dioxide));
        $(".edit-form").find("#NitoDioxideValid").val(Number(response.nito_dioxit));
      })
    ).then(() => {
      // Handle Update form
      $("#updateForm").on("submit", function (e) {
        e.preventDefault();
        let address_val = $(".edit-form").find("#AdressValid").val();
        let lat_val = Number($(".edit-form").find("#LatitudeValid").val());
        let long_val = Number($(".edit-form").find("#LongitudeValid").val());
        let date_val = $(".edit-form").find("#DatetimeValid").val();
        let wind_degree_val = Number($(".edit-form").find("#WindDegreeValid").val());
        let humidity_val = Number($(".edit-form").find("#HumidityValid").val());
        let wind_speed_val = Number($(".edit-form").find("#WindSpeedValid").val());
        let wind_dust_val = Number($(".edit-form").find("#WindDustValid").val());
        let sulfur_dioxide_val = Number($(".edit-form").find("#SulfurDioxideValid").val());
        let nito_dioxide_val = Number($(".edit-form").find("#NitoDioxideValid").val());

        let request = {
          url: `http://localhost:8080/api/v1/airs/${airId}`,
          type: "PUT",
          data: {
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
              $(rowDelete).find("td").eq(5).html(res.wind_degree);
              $(rowDelete).find("td").eq(6).html(res.humidity);
              $(rowDelete).find("td").eq(7).html(res.wind_speed);
              $(rowDelete).find("td").eq(8).html(res.wind_dust);
              $(rowDelete).find("td").eq(9).html(res.sulfur_dioxide);
              $(rowDelete).find("td").eq(10).html(res.nito_dioxit);
              $(rowDelete).find("td").eq(11).html(res.result);
              $(rowDelete).find("td").eq(12).html(`<div class="d-flex justify-content-center">
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
            }, 250);
          })
          .fail(() => {
            alert("Cập nhật thất bại!");
          });
      });
    });
  });
});
