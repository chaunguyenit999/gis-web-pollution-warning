/**
 * @description (BỤI MỊN) CHỈ SỐ
  1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
  2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
  3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
  4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
  5.Xấu: nồng độ PM2.5 trên 75 µg/m³

 * @description (SULFUR) CHỈ SỐ
  1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
  2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
  3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
  4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
  5.Xấu: nồng độ PM2.5 trên 75 µg/m³

  * @description (NITO) CHỈ SỐ
  1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
  2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
  3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
  4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
  5.Xấu: nồng độ PM2.5 trên 75 µg/m³

  * @description (RESULT) CHỈ SỐ
  Result = Max(Chỉ số sulfur, Chỉ số bụi mịn, Chỉ số nito)
 */

const mongoose = require("mongoose");
const calcResult = require("../helpers/calc-env_result");


const airQualitySchema = new mongoose.Schema({
  location: {
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  wind_degree: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  wind_speed: {
    type: Number,
    required: true,
  },
  wind_dust: {
    type: Number,
    required: true,
  },
  sulfur_dioxide: {
    type: Number,
    required: true,
  },
  nito_dioxit: {
    type: Number,
    required: true,
  },
  result: {
    type: Number,
    default: function () {
      let wind_dust_val = this.wind_dust;
      let sulfur_dioxide_val = this.sulfur_dioxide;
      let nito_dioxit_val = this.nito_dioxit;
      let cal_data = {
        wind_dust_val: wind_dust_val,
        sulfur_dioxide_val: sulfur_dioxide_val,
        nito_dioxit_val: nito_dioxit_val,
      };
      let result_val = calcResult.air(cal_data);

      return result_val;
    },
  },
});
module.exports = mongoose.model("airQuality", airQualitySchema);
