$(document).ready(function () {
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
      .done(() => {
        location.reload();
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
          .val(response.sulfur_dioxide);
        $(".edit-form").find("#NitoDioxideValid").val(response.nito_dioxit);
      })
    ).then(() => {
      // Handle Update form
      $("#updateForm").on("submit", function (e) {
        e.preventDefault();

        let address_val = $(".edit-form").find("#AdressValid").val();
        let lat_val = $(".edit-form").find("#LatitudeValid").val();
        let long_val = $(".edit-form").find("#LongitudeValid").val();
        let date_val = $(".edit-form").find("#DatetimeValid").val();
        let wind_degree_val = $(".edit-form").find("#WindDegreeValid").val();
        let humidity_val = $(".edit-form").find("#HumidityValid").val();
        let wind_speed_val = $(".edit-form").find("#WindSpeedValid").val();
        let wind_dust_val = $(".edit-form").find("#WindDustValid").val();
        let sulfur_dioxide_val = $(".edit-form")
          .find("#SulfurDioxideValid")
          .val();
        let nito_dioxide_val = $(".edit-form").find("#NitoDioxideValid").val();

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
    let airId = $(this).data("actionid");
    // DELETE REQUEST
    let request = {
      url: `http://localhost:8080/api/v1/airs/${airId}`,
      type: "DELETE",
    };
    $.ajax(request).done(() => {
      location.reload();
    });
  });
});
