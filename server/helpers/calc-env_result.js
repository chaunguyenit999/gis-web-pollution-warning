const calcResult = {
    air: (cal_data) => {
      let wind_dust_val = cal_data.wind_dust_val;
      let sulfur_dioxide_val = cal_data.sulfur_dioxide_val;
      let nito_dioxit_val = cal_data.nito_dioxit_val;
  
      let wind_dust_result, sulfur_dioxide_result, nito_dioxit_result;
      /**
      @description (BỤI MỊN) CHỈ SỐ
      1.Tốt: dưới 200 µg/m³
      2.Hơi tốt: từ 200 đến 300 µg/m³
      3.Trung bình: từ 300 đến 400 µg/m³
      4.Kém: từ 400 µg/m³
      */
      if (wind_dust_val < 200) {
        wind_dust_result = 1;
      } else if (wind_dust_val < 300) {
        wind_dust_result = 2;
      } else if (wind_dust_val < 400) {
        wind_dust_result = 3;
      } else {
        wind_dust_result = 4;
      }
  
      /**
      @description (SULFUR) CHỈ SỐ
      1.Cấp độ tốt: Lượng SO2 trong không khí là từ 0 đến 30 microgram/m3.
      2.Cấp độ trung bình: Lượng SO2 trong không khí là từ 30 đến 70 microgram/m3.
      3.Cấp độ không tốt cho sức khỏe: Lượng SO2 trong không khí là từ 70 đến 180 microgram/m3.
      4.Cấp độ nguy hại cho sức khỏe: Lượng SO2 trong không khí là từ 180 đến 300 microgram/m3.
      */
      if (sulfur_dioxide_val < 50) {
        sulfur_dioxide_result = 1;
      } else if (sulfur_dioxide_val < 70) {
        sulfur_dioxide_result = 2;
      } else if (sulfur_dioxide_val < 100) {
        sulfur_dioxide_result = 3;
      } else {
        sulfur_dioxide_result = 4;
      }
  
      /**
      @description (NITO) CHỈ SỐ
      1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
      2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
      3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
      4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
      5.Xấu: nồng độ PM2.5 trên 75 µg/m³
      */
      if (nito_dioxit_val < 35) {
        nito_dioxit_result = 1;
      } else if (nito_dioxit_val < 50) {
        nito_dioxit_result = 2;
      } else if (nito_dioxit_val < 80) {
        nito_dioxit_result = 3;
      } else {
        nito_dioxit_result = 4;
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
  