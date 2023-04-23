const calcResult = require("../helpers/calc-env_result");
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
  result: {
    type: Number,
    default: function () {
      let pH = this.pH;
      let BOD5 = this.BOD5;
      let COD = this.COD;
      let DO = this.DO;
      let SS = this.SS;
      let EC = this.EC;
      let TDS = this.TDS;
      let NO2 = this.NO2;
      let NO3 = this.NO3;
      let NH4 = this.NH4;
      let P3O4 = this.P3O4;
      let calc_data = {
        pH,
        BOD5,
        COD,
        DO,
        SS,
        EC,
        TDS,
        NO2,
        NO3,
        NH4,
        P3O4,
      };
      let result_val = calcResult.water(calc_data);

      return result_val;
    },
  },
});
module.exports = mongoose.model("waterQuality", waterQualitySchema);
