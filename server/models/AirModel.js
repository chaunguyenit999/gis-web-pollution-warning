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
      let wind_dust = this.wind_dust;
      let sulfur_dioxide = this.sulfur_dioxide;
      let nito_dioxit = this.nito_dioxit;
      let calc_data = {
        wind_dust,
        sulfur_dioxide,
        nito_dioxit,
      };
      let result_val = calcResult.air(calc_data);

      return result_val;
    },
  },
});
module.exports = mongoose.model("airQuality", airQualitySchema);
