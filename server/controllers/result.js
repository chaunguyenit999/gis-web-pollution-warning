const Air = require("../models/AirModel");
const Water = require("../models/WaterModel");
const Soil = require("../models/SoilModel");
const resultAir = require("./resultAir.js");
const resultWater = require("./resultWater.js");
const resultSoil = require("./resultSoil.js");


const resultAll = {
    resultAllAir: async (req, res) => {
        try {
          const airs = await Air.find();
            for(let i = 0; i < airs.length; i++) {
                const data = airs[i];
              if (data.result == 0) {
                const result = await resultAir.result(data._id)
                console.log(result)
                //await Air.findByIdAndUpdate(data._id,{ $set: { result: result }},{ new: true });
              }
              else{
                const result = await resultAir.result(data._id)
                console.log(result)
                //await Air.findByIdAndUpdate(data._id,{ result: result },{ new: true })
              }
          };
          res.status(200).json('Success!')
        } catch (error) {
          res.status(500).json({message: error});
        }
      },

      resultAllWater: async (req, res) => {
        try {
          const waters = await Water.find();
          waters.forEach(async (data) => {
            if (typeof data.result === "undefined") {
              const result = await resultWater.result(data._id)
              await Water.findByIdAndUpdate(data._id,{ $set: { result: result }},{ new: true });}
            else{
              const result = await resultWater.result(data._id)
              await Water.findByIdAndUpdate(data._id,{ result: result },{ new: true })
            }
          });
          res.status(200).json('Success!')
        } catch (error) {
          res.status(500).json({message: error});
        }
      },

      resultAllSoil: async (req, res) => {
        try {
          const soils = await Soil.find();
          soils.forEach(async (data) => {
            if (typeof data.result === "undefined") {
              const result = await resultSoil.result(data._id)
              await Soil.findByIdAndUpdate(data._id,{ $set: { result: result }},{ new: true });}
            else{
              const result = await resultSoil.result(data._id)
              await Soil.findByIdAndUpdate(data._id,{ result: result },{ new: true })
            }
          });
          res.status(200).json('Success!')
        } catch (error) {
          res.status(500).json({message: error});
        }
      }
    }

module.exports = resultAll  