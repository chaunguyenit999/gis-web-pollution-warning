(function ($) {
  // Default ajax
  var location_choice = $("#location-choices");
  var daterange_choice = $("#daterange-choices");
  var year_choice = $("#year-choices");
  var measured_choice = $("#measured-choices");
  var month_choice = $("#month-choices");
  var day_choice = $("#day-choices");

  month_choice.parent().hide();
  day_choice.parent().hide();

  // UTILS FUNCTION
  function measure_choice(item, type) {
    if (type == "measure") {
      if (measured_choice.val() == "o3") {
        return item.o3.value;
      }
      if (measured_choice.val() == "pm2_5") {
        return item.pm2_5.value;
      }
      if (measured_choice.val() == "pm10") {
        return item.pm10.value;
      }
      if (measured_choice.val() == "co") {
        return item.co.value;
      }
      if (measured_choice.val() == "so2") {
        return item.so2.value;
      }
      if (measured_choice.val() == "no2") {
        return item.no2.value;
      }
    }
    if (type == "aqi") {
      if (measured_choice.val() == "o3") {
        return item.o3.aqi;
      }
      if (measured_choice.val() == "pm2_5") {
        return item.pm2_5.aqi;
      }
      if (measured_choice.val() == "pm10") {
        return item.pm10.aqi;
      }
      if (measured_choice.val() == "co") {
        return item.co.aqi;
      }
      if (measured_choice.val() == "so2") {
        return item.so2.aqi;
      }
      if (measured_choice.val() == "no2") {
        return item.no2.aqi;
      }
    }
  }

  function date_choice(item, type) {
    if (type == "month") {
      return item.date.month;
    }
    if (type == "day") {
      return item.date.day;
    }
    if (type == "hour") {
      const hour = item.date.hour;
      const minute = item.date.minute;
      const timeKey = `${hour}:${minute}`;
      return timeKey;
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
      itemWidth: 20, // Chỉnh kích thước chiều rộng của các ô màu
      itemHeight: 180, // Chỉnh kích thước chiều cao của các ô màu
      textStyle: {
        fontSize: 13.5, // Chỉnh kích thước fontsize ở đây
      },
    },
    grid: { containLabel: true },
    xAxis: { name: "" },
    yAxis: {
      type: "category",
      sort: false, // Ngăn sắp xếp thứ tự trục y
    },
  };

  function barChartShow(option) {
    let data;
    let time_asign

    if (option.rangetime == "all_hour_in_current_day") {
      time_asign = "Thời gian ";
      let currentDate = new Date();
      let currentDay = currentDate.getDate();
      let currentMonth = currentDate.getMonth() + 1;
      let currentYear = currentDate.getFullYear();
      let exactdate = currentYear + "-" + currentMonth + "-" + currentDay;
      if (option.area == "all_location_in_state") {
        data = {
          fromdate: exactdate,
          todate: exactdate,
        };
      }
      if (option.area == "each_location_in_state") {
        data = {
          fromdate: exactdate,
          todate: exactdate,
          lat: location_choice.val().split("_")[0],
          long: location_choice.val().split("_")[1],
        };
      }
    }

    if (option.rangetime == "all_month_in_year") {
      time_asign = "Tháng ";
      if (option.area == "all_location_in_state") {
        data = {
          fromdate: year_choice.val() + "-01-01",
          todate: year_choice.val() + "-12-31",
        };
      }
      if (option.area == "each_location_in_state") {
        data = {
          fromdate: year_choice.val() + "-01-01",
          todate: year_choice.val() + "-12-31",
          lat: location_choice.val().split("_")[0],
          long: location_choice.val().split("_")[1],
        };
      }
    }

    if (option.rangetime == "all_day_in_month") {
      time_asign = "Ngày ";
      if (option.area == "all_location_in_state") {
        data = {
          fromdate: year_choice.val() + "-" + month_choice.val() + "-01",
          todate: year_choice.val() + "-" + month_choice.val() + "-31",
        };
      }
      if (option.area == "each_location_in_state") {
        data = {
          fromdate: year_choice.val() + "-" + month_choice.val() + "-01",
          todate: year_choice.val() + "-" + month_choice.val() + "-31",
          lat: location_choice.val().split("_")[0],
          long: location_choice.val().split("_")[1],
        };
      }
    }

    if (option.rangetime == "all_hour_in_day") {
      time_asign = "Thời gian ";
      let exactdate = year_choice.val() + "-" + month_choice.val() + "-" + day_choice.val();
      if (option.area == "all_location_in_state") {
        data = {
          fromdate: exactdate,
          todate: exactdate,
        };
      }
      if (option.area == "each_location_in_state") {
        data = {
          fromdate: exactdate,
          todate: exactdate,
          lat: location_choice.val().split("_")[0],
          long: location_choice.val().split("_")[1],
        };
      }
    }

    $.ajax({
      url: `/api/v1/open-api/openweathermap/airs/filter`,
      type: "GET",
      data: data,
      dataType: "json",
      success: function (res) {
        // Tạo một đối tượng để lưu trữ tổng giá trị aqi và measured_val của measured_val cho mỗi time
        let rangeTimeTotals = {};

        // Duyệt qua mỗi đối tượng trong danh sách res
        res.forEach((item) => {
          const measured_val = measure_choice(item, "measure");
          const aqi_val = measure_choice(item, "aqi");

          let time_val = null;
          if (option.rangetime == "all_month_in_year") {
            time_val = date_choice(item, type = "month");
          }
          if (option.rangetime == "all_day_in_month") {
            time_val = date_choice(item, type = "day");
          }
          if (
            option.rangetime == "all_hour_in_day" ||
            option.rangetime == "all_hour_in_current_day"
          ) {
            time_val = date_choice(item, (type = "hour"));
          }

          // Nếu time chưa tồn tại trong đối tượng rangeTimeTotals, khởi tạo nó với giá trị ban đầu
          if (!rangeTimeTotals[time_val]) {
            rangeTimeTotals[time_val] = {
              measuredSum: 0,
              aqiSum: 0,
              count: 0,
            };
          }

          // Cộng giá trị measured_val và aqi của measured_val cho time hiện tại
          rangeTimeTotals[time_val].measuredSum += measured_val;
          rangeTimeTotals[time_val].aqiSum += aqi_val;
          rangeTimeTotals[time_val].count++;
        });

        // Tạo mảng newData để lưu trữ giá trị trung bình aqi và measured_val của measured_val cho mỗi time
        let newData = [];

        // Duyệt qua từng time trong rangeTimeTotals
        for (let time_val in rangeTimeTotals) {
          // Tính giá trị trung bình bằng cách chia tổng cho số lượng đối tượng
          const aqiAverage = rangeTimeTotals[time_val].aqiSum / rangeTimeTotals[time_val].count;
          const measuredAverage = rangeTimeTotals[time_val].measuredSum / rangeTimeTotals[time_val].count;

          // Thêm giá trị trung bình aqi, measured_val và time vào mảng newData
          if (
            option.rangetime == "all_hour_in_day" ||
            option.rangetime == "all_hour_in_current_day"
          ) {
            newData.push([
              aqiAverage,
              measuredAverage,
              time_asign + time_val,
            ]);
          } else {
            newData.push([
              aqiAverage,
              measuredAverage,
              time_asign + Number(time_val),
            ]);
          }
        }

        newData.unshift(["aqi", "measured_val", "time"]);

        myBarChart.setOption({
          dataset: {
            source: newData,
          },
          series: [
            {
              type: "bar",
              encode: {
                x: "measured_val",
                y: "time",
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
    barChartShow({
      area: "all_location_in_state",
      rangetime: "all_hour_in_current_day",
    });
  }

  // Handle logic
  $(
    "#location-choices, #year-choices, #measured-choices, #daterange-choices"
  ).change(function () {
    // Thực hiện hành động khi một thẻ select thay đổi
    var location_choice_val = location_choice.val();
    var daterange_choice_val = daterange_choice.val();

    if(daterange_choice_val == "all_hour_in_current_day") {
      month_choice.parent().hide();
      day_choice.parent().hide();

      // Handle event
      if (location_choice_val == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_hour_in_current_day",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_hour_in_current_day",
        });
      }
    }
    // Dữ liệu trong năm
    if (daterange_choice_val == "all_month_in_year") {
      month_choice.parent().hide();
      day_choice.parent().hide();

      // Handle event
      if (location_choice_val == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_month_in_year",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_month_in_year",
        });
      }
    }
    // Dữ liệu trong tháng
    if (daterange_choice_val == "all_day_in_month") {
      day_choice.parent().hide();
      month_choice.parent().show();

      // Handle event
      if (location_choice_val == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_day_in_month",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_day_in_month",
        });
      }
    }

    if (daterange_choice_val == "all_hour_in_day") {
      month_choice.parent().show();
      day_choice.parent().show();
      // Handle event
      if (location_choice_val == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_hour_in_day",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_hour_in_day",
        });
      }
    }

  });

  $("#month-choices, #day-choices").change(function () {
    if (daterange_choice.val() == "all_day_in_month") {
      if (location_choice.val() == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_day_in_month",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_day_in_month",
        });
      }
    }
    if (daterange_choice.val() == "all_hour_in_day") {
      if (location_choice.val() == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_hour_in_day",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_hour_in_day",
        });
      }
    }
  })

  month_choice.change(function () {
    if (daterange_choice.val() == "all_day_in_month") {
      if (location_choice.val() == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_day_in_month",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_day_in_month",
        });
      }
    }
  });

  day_choice.change(function () {
    if (daterange_choice.val() == "all_hour_in_day") {
      if (location_choice.val() == "all_location_in_state") {
        barChartShow({
          area: "all_location_in_state",
          rangetime: "all_hour_in_day",
        });
      } else {
        barChartShow({
          area: "each_location_in_state",
          rangetime: "all_hour_in_day",
        });
      }
    }
  });

  $(window).on("resize", function () {
    if (myBarChart != null && myBarChart != undefined) {
      myBarChart.resize();
    }
  });
})(jQuery);
