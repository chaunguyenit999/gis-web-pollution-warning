const mongoose = require("mongoose");

const waterQualitySchema = new mongoose.Schema({
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
  pH: {
    type: Number,
    required: true,
  },
  degree: {
    type: Number,
    required: true,
  },
  DO: {
    type: Number,
    required: true,
  },
  EC: {
    type: Number,
    required: true,
  },
  TDS: {
    type: Number,
    required: true,
  },
  SS: {
    type: Number,
    required: true,
  },
  BOD5: {
    type: Number,
    required: true,
  },
  COD: {
    type: Number,
    required: true,
  },
  NO2: {
    type: Number,
    required: true,
  },
  NO3: {
    type: Number,
    required: true,
  },
  NH4: {
    type: Number,
    required: true,
  },
  P3O4: {
    type: Number,
    required: true,
  },
  Coliform: {
    type: Number,
    required: true,
  },
  Oil: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("waterQuality", waterQualitySchema);
