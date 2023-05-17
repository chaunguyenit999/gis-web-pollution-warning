(function ($) {
    // Default ajax
    var location_choice = $("#location-choices");
    var daterange_choice = $("#daterange-choices");
    var year_choice = $("#year-choices");
    var measured_choice = $("#measured-choices");
    var month_choice = $("#month-choices");

    var sourceList = [];
    month_choice.parent().hide();

    // UTILS FUNCTION
    function measure_choice(item, type) {
        if (type == "measure") {
            if (measured_choice.val() == "tsp") {
                return item.tsp.value;
            }
            if (measured_choice.val() == "so2") {
                return item.so2.value;
            }
            if (measured_choice.val() == "no2") {
                return item.no2.value;
            }
        }
        if (type == "aqi") {
            if (measured_choice.val() == "tsp") {
                return item.tsp.aqi;
            }
            if (measured_choice.val() == "so2") {
                return item.so2.aqi;
            }
            if (measured_choice.val() == "no2") {
                return item.no2.aqi;
            }
        }
    }

    // BAR CHART
    var myBarChart = echarts.init(document.getElementById("e-basic-bar"));

    var baroption = {
        visualMap: {
            orient: "horizontal",
            left: "center",
            min: 0,
            max: 500,
            text: ["AQI max", "AQI min"],
            // Map the aqi column to color
            dimension: 0,
            inRange: {
                color: ["#00e400", "#ff0", "#ff7e00", "#f00", "#8f3f97", "#7e0023"],
            },
        },
        grid: { containLabel: true },
        xAxis: { name: "" },
        yAxis: {
            type: "category",
            sort: false, // Ngăn sắp xếp thứ tự trục y
        },
    };

    function barChartShow_avgAllLocationOfState_allMonthInYear() {
        $.ajax({
          url: `/api/v1/stations/airs/filter`,
          type: "GET",
          data: {
            fromdate: year_choice.val() + "-01-01",
            todate: year_choice.val() + "-12-31",
          },
          dataType: "json",
          success: function (res) {
            // Biến đổi dữ liệu
            var months = {};
            fetchValues = [];

            res.forEach(function (item) {
              var month = item.date.month;
              var value = measure_choice(item, "measure");
              var aqi = measure_choice(item, "aqi");

              if (!months[month]) {
                months[month] = {
                  count: 0,
                  sumValue: 0,
                  sumAqi: 0,
                };
              }

              months[month].count++;
              months[month].sumValue += value;
              months[month].sumAqi += aqi;
            });
            for (var month in months) {
              var count = months[month].count;
              var avgValue = months[month].sumValue / count;
              var avgAqi = months[month].sumAqi / count;

              fetchValues.push([
                Number(avgValue.toFixed(1)),
                Math.round(avgAqi),
                "Tháng " + month,
              ]);
            }
            sourceList = [["aqi", "measured_val", "month"], ...fetchValues];

            // Thay đổi
            myBarChart.setOption({
              dataset: {
                source: sourceList,
              },
              series: [
                {
                  type: "bar",
                  encode: {
                    // Map the "Value" source column to X axis.
                    x: "measured_val",
                    // Map the "month" source column to Y axis
                    y: "month",
                  },
                },
              ],
              ...baroption,
            });
          },
        });
    }

    function barChartShow_eachLocationOfState_allMonthInYear() {
        $.ajax({
          url: `/api/v1/stations/airs/filter`,
          type: "GET",
          data: {
            fromdate: year_choice.val() + "-01-01",
            todate: year_choice.val() + "-12-31",
            lat: location_choice.val().split("_")[0],
            long: location_choice.val().split("_")[1],
          },
          dataType: "json",
          success: function (res) {
            // Biến đổi dữ liệu
            fetchValues = [];

            res.forEach(function (item) {
              var measured_value = measure_choice(item, "measure");
              var aqi_value = measure_choice(item, "aqi");
              var month = "Tháng " + item.date.month;

              fetchValues.push([measured_value, aqi_value, month]);
            });

            sourceList = [["aqi", "measured_val", "month"], ...fetchValues];
            // Thay đổi
            myBarChart.setOption({
              dataset: {
                source: sourceList,
              },
              series: [
                {
                  type: "bar",
                  encode: {
                    // Map the "Value" source column to X axis.
                    x: "measured_val",
                    // Map the "month" source column to Y axis
                    y: "month",
                  },
                },
              ],
              ...baroption,
            });
          },
        });
    }

    function barChartShow_avgAllLocationOfState_allDayInMonth() {
      $.ajax({
        url: `/api/v1/stations/airs/filter`,
        type: "GET",
        data: {
          fromdate: year_choice.val() + "-" + month_choice.val() + "-01",
          todate: year_choice.val() + "-" + month_choice.val() + "-31",
        },
        dataType: "json",
        success: function (res) {
          // Biến đổi dữ liệu
          var days = {};
          fetchValues = [];

          res.forEach(function (item) {
            var value = measure_choice(item, "measure");
            var aqi = measure_choice(item, "aqi");
            var day = item.date.day;

            if (!days[day]) {
              days[day] = {
                count: 0,
                sumValue: 0,
                sumAqi: 0,
              };
            }

            days[day].count++;
            days[day].sumValue += value;
            days[day].sumAqi += aqi;
          });
          for (var day in days) {
            var count = days[day].count;
            var avgValue = days[day].sumValue / count;
            var avgValueAqi = days[day].sumAqi / count;

            fetchValues.push([avgValue, avgValueAqi, "Ngày" + day]);
          }

          sourceList = [["aqi", "measured_val", "day"], ...fetchValues];

          console.log(sourceList);
          // Thay đổi
          myBarChart.setOption({
            dataset: {
              source: sourceList,
            },
            series: [
              {
                type: "bar",
                encode: {
                  // Map the "Value" source column to X axis.
                  x: "measured_val",
                  // Map the "day" source column to Y axis
                  y: "day",
                },
              },
            ],
            ...baroption,
          });
        },
      });
    }

    function barChartShow_eachAllLocationOfState_allDayInMonth() {
        $.ajax({
          url: `/api/v1/stations/airs/filter`,
          type: "GET",
          data: {
            fromdate: year_choice.val() + "-" + month_choice.val() + "-01",
            todate: year_choice.val() + "-" + month_choice.val() + "-31",
            lat: location_choice.val().split("_")[0],
            long: location_choice.val().split("_")[1],
          },
          dataType: "json",
          success: function (res) {
            fetchValues = [];

            res.forEach(function (item) {
              var measured_value = measure_choice(item, "measure");
              var aqi_value = measure_choice(item, "aqi");
              var day = "Ngày " + item.date.day;

              fetchValues.push([measured_value, aqi_value, day]);
            });

            sourceList = [["aqi", "measured_val", "day"], ...fetchValues];

            console.log(sourceList);
            // Thay đổi
            myBarChart.setOption({
              dataset: {
                source: sourceList,
              },
              series: [
                {
                  type: "bar",
                  encode: {
                    // Map the "Value" source column to X axis.
                    x: "measured_val",
                    // Map the "day" source column to Y axis
                    y: "day",
                  },
                },
              ],
              ...baroption,
            });
          },
        });
    }

    // Default chart when component loaded
    if (location_choice && year_choice && measured_choice && daterange_choice) {
        barChartShow_avgAllLocationOfState_allMonthInYear();
    }

    // Handle logic
    $("#location-choices, #year-choices, #measured-choices, #daterange-choices").change(function () {
        // Thực hiện hành động khi một thẻ select thay đổi
        var location_choice_val = location_choice.val();
        var daterange_choice_val = daterange_choice.val();
        var month_choice_val = month_choice.val();

        // Gọi hàm hoặc thực hiện các hành động khác tại đây
        if (daterange_choice_val == "all_month_in_year") {
            // rest mặc định giá trị tháng về 1
            month_choice_val = 1;
            // ui-logic
            location_choice.parent().removeClass("col-md-4");
            location_choice.parent().addClass("col-md-6");
            month_choice.parent().hide();

            // Handle event
            if (location_choice_val == "avg_all_location_in_state") {
              barChartShow_avgAllLocationOfState_allMonthInYear();
            } else {
              barChartShow_eachLocationOfState_allMonthInYear();
            }
        }

        if (daterange_choice_val == "all_day_in_month") {
          // ui-logic
          location_choice.parent().removeClass("col-md-6");
          location_choice.parent().addClass("col-md-4");
          month_choice.parent().show();

          // Handle event
          if (location_choice_val == "avg_all_location_in_state") {
            barChartShow_avgAllLocationOfState_allDayInMonth();
          } else {
            barChartShow_eachAllLocationOfState_allDayInMonth();
          }
        }
    });

    month_choice.change(function () {
        if (location_choice.val() == "avg_all_location_in_state") {
          barChartShow_avgAllLocationOfState_allDayInMonth();
        } else {
          barChartShow_eachAllLocationOfState_allDayInMonth();
        }
    });

    $(window).on("resize", function () {
        if (myBarChart != null && myBarChart != undefined) {
            myBarChart.resize();
        }
    });
})(jQuery);
