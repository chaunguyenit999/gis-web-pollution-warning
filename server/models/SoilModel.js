const mongoose = require("mongoose");

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
});
module.exports = mongoose.model("soilQuality", soilQualitySchema);
