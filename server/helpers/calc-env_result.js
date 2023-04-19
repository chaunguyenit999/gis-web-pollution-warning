const calcResult = {
  air: (cal_data) => {
    let wind_dust_val = cal_data.wind_dust_val;
    let sulfur_dioxide_val = cal_data.sulfur_dioxide_val;
    let nito_dioxit_val = cal_data.nito_dioxit_val;

    let wind_dust_result, sulfur_dioxide_result, nito_dioxit_result;
    /**
    @description (BỤI MỊN) CHỈ SỐ
    1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
    2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
    3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
    4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
    5.Xấu: nồng độ PM2.5 trên 75 µg/m³
    */
    if (wind_dust_val < 10) {
      wind_dust_result = 1;
    } else if (wind_dust_val < 25) {
      wind_dust_result = 2;
    } else if (wind_dust_val < 50) {
      wind_dust_result = 3;
    } else if (wind_dust_val < 75) {
      wind_dust_result = 4;
    } else {
      wind_dust_result = 5;
    }

    /**
    @description (SULFUR) CHỈ SỐ
    1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
    2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
    3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
    4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
    5.Xấu: nồng độ PM2.5 trên 75 µg/m³ 
    */
    if (sulfur_dioxide_val < 35) {
      sulfur_dioxide_result = 1;
    } else if (sulfur_dioxide_val < 75) {
      sulfur_dioxide_result = 2;
    } else if (sulfur_dioxide_val < 185) {
      sulfur_dioxide_result = 3;
    } else if (sulfur_dioxide_val < 304) {
      sulfur_dioxide_result = 4;
    } else {
      sulfur_dioxide_result = 5;
    }

    /**
    @description (NITO) CHỈ SỐ
    1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
    2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
    3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
    4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
    5.Xấu: nồng độ PM2.5 trên 75 µg/m³
    */
    if (nito_dioxit_val < 40) {
      nito_dioxit_result = 1;
    } else if (nito_dioxit_val < 100) {
      nito_dioxit_result = 2;
    } else if (nito_dioxit_val < 200) {
      nito_dioxit_result = 3;
    } else if (nito_dioxit_val < 400) {
      nito_dioxit_result = 4;
    } else {
      nito_dioxit_result = 5;
    }

    let result = Math.max(
      wind_dust_result,
      sulfur_dioxide_result,
      nito_dioxit_result
    );

    return result;
  },
};

module.exports = calcResult;
