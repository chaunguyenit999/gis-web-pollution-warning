const mongoose = require("mongoose");
const calcResult = require("../helpers/calc-env_result");


const airQualitySchema = new mongoose.Schema({
  result: {
    type: String,
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
    default: Date.now()
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
  city: {
    type: String,
    default: "Hà Nam"
  },
});
module.exports = mongoose.model("airQuality", airQualitySchema);