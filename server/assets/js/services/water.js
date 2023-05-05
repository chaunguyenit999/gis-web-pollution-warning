$(document).ready(function () {
  // INSERT FORM HANDLE
  $("#insertForm").on("submit", function (e) {
    e.preventDefault();

    let address_val = $("#AdressValid").val();
    let lat_val = $("#LatitudeValid").val();
    let long_val = $("#LongitudeValid").val();
    let date_val = $("#DatetimeValid").val();
    let ph_val = $("#PhValid").val();
    let degree_val = $("#DegreeValid").val();
    let do_val = $("#DoValid").val();
    let ec_val = $("#EcValid").val();
    let tds_val = $("#TdsValid").val();
    let ss_val = $("#SsValid").val();
    let bod5_val = $("#Bod5Valid").val();
    let cod_val = $("#CodValid").val();
    let no2_val = $("#No2Valid").val();
    let no3_val = $("#No3Valid").val();
    let nh4_val = $("#Nh4Valid").val();
    let p3o4_val = $("#P3O4Valid").val();
    let coliform_val = $("#ColiformValid").val();
    let oil_val = $("#OilValid").val();

    let request = {
      url: "http://localhost:8080/api/v1/waters",
      type: "POST",
      data: {
        location: {
          address: address_val,
          latitude: lat_val,
          longitude: long_val,
        },
        date: date_val,
        pH: ph_val,
        degree: degree_val,
        DO: do_val,
        EC: ec_val,
        TDS: tds_val,
        SS: ss_val,
        BOD5: bod5_val,
        COD: cod_val,
        NO2: no2_val,
        NO3: no3_val,
        NH4: nh4_val,
        P3O4: p3o4_val,
        Coliform: coliform_val,
        Oil: oil_val,
      },
    };

    $.ajax(request)
      .done(() => {
        location.reload();
      })
      .fail((err) => {
        console.log(err);
        alert("Tạo mới thất bại!");
      });
  });

  // UPDATE FORM HANDLE
  $(".edit-form").on("show.bs.modal", function (event) {
    let waterId = $(event.relatedTarget).data("actionid");
    let formatDate = (date) => {
      return date.substring(0, date.length - 5);
    };
    // get data from modal (https://stackoverflow.com/questions/5896287/jquery-passing-value-from-one-input-to-another)
    let request = {
      url: `http://localhost:8080/api/v1/waters/${waterId}`,
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
        $(".edit-form").find("#PhValid").val(Number(response.pH));
        $(".edit-form").find("#DegreeValid").val(Number(response.degree));
        $(".edit-form").find("#DoValid").val(Number(response.DO));
        $(".edit-form").find("#EcValid").val(response.EC);
        $(".edit-form").find("#TdsValid").val(response.TDS);
        $(".edit-form").find("#SsValid").val(response.SS);
        $(".edit-form").find("#Bod5Valid").val(response.BOD5);
        $(".edit-form").find("#CodValid").val(response.COD);
        $(".edit-form").find("#No2Valid").val(response.NO2);
        $(".edit-form").find("#No3Valid").val(response.NO3);
        $(".edit-form").find("#Nh4Valid").val(response.NH4);
        $(".edit-form").find("#P3O4Valid").val(response.P3O4);
        $(".edit-form").find("#ColiformValid").val(response.Coliform);
        $(".edit-form").find("#OilValid").val(response.Oil);
      })
    ).then(() => {
      // Handle Update form
      $("#updateForm").on("submit", function (e) {
        e.preventDefault();

        let address_val = $(".edit-form").find("#AdressValid").val();
        let lat_val = $(".edit-form").find("#LatitudeValid").val();
        let long_val = $(".edit-form").find("#LongitudeValid").val();
        let date_val = $(".edit-form").find("#DatetimeValid").val();
        let ph_val = $(".edit-form").find("#PhValid").val();
        let degree_val = $(".edit-form").find("#DegreeValid").val();
        let do_val = $(".edit-form").find("#DoValid").val();
        let ec_val = $(".edit-form").find("#EcValid").val();
        let tds_val = $(".edit-form").find("#TdsValid").val();
        let ss_val = $(".edit-form").find("#SsValid").val();
        let bod5_val = $(".edit-form").find("#Bod5Valid").val();
        let cod_val = $(".edit-form").find("#CodValid").val();
        let no2_val = $(".edit-form").find("#No2Valid").val();
        let no3_val = $(".edit-form").find("#No3Valid").val();
        let nh4_val = $(".edit-form").find("#Nh4Valid").val();
        let p3o4_val = $(".edit-form").find("#P3O4Valid").val();
        let coliform_val = $(".edit-form").find("#ColiformValid").val();
        let oil_val = $(".edit-form").find("#OilValid").val();

        let request = {
          url: `http://localhost:8080/api/v1/waters/${waterId}`,
          type: "PUT",
          data: {
            location: {
              address: address_val,
              latitude: lat_val,
              longitude: long_val,
            },
            date: date_val,
            pH: ph_val,
            degree: degree_val,
            DO: do_val,
            EC: ec_val,
            TDS: tds_val,
            SS: ss_val,
            BOD5: bod5_val,
            COD: cod_val,
            NO2: no2_val,
            NO3: no3_val,
            NH4: nh4_val,
            P3O4: p3o4_val,
            Coliform: coliform_val,
            Oil: oil_val,
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
    let waterId = $(this).data("actionid");
    // DELETE REQUEST
    let request = {
      url: `http://localhost:8080/api/v1/waters/${waterId}`,
      type: "DELETE",
    };
    $.ajax(request).done(() => {
      location.reload();
    });
  });
});
