const mongoose = require("mongoose");
const calcResult = require("../helpers/calc-env_result");

const soilQualitySchema = new mongoose.Schema({
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
  exchange_acidity: {
    type: Number,
    required: true,
  },
  total_nitrogen: {
    type: Number,
    required: true,
  },
  total_photpho: {
    type: Number,
    required: true,
  },
  total_kali: {
    type: Number,
    required: true,
  },
  calci: {
    type: Number,
    required: true,
  },
  magie: {
    type: Number,
    required: true,
  },
  zinc: {
    type: Number,
    required: true,
  },
  plumbum: {
    type: Number,
    required: true,
  },
  copper: {
    type: Number,
    required: true,
  },
  arsenic: {
    type: Number,
    required: true,
  },
  result: {
    type: Number,
    default: function () {
      let exchange_acidity = this.exchange_acidity;
      let total_nitrogen = this.total_nitrogen;
      let total_photpho = this.total_photpho;
      let total_kali = this.total_kali;
      let calci = this.calci;
      let magie = this.magie;
      let zinc = this.zinc;
      let plumbum = this.plumbum;
      let copper = this.copper;
      let arsenic = this.arsenic;
      let calc_data = {
        exchange_acidity,
        total_nitrogen,
        total_photpho,
        total_kali,
        calci,
        magie,
        zinc,
        plumbum,
        copper,
        arsenic,
      };
      let result_val = calcResult.soil(calc_data);

      return result_val;
    },
  },
});
module.exports = mongoose.model("soilQuality", soilQualitySchema);
