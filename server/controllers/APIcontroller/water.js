const Water = require("../../models/WaterModel");
const calcResult = require("../../helpers/calc-env_result");

const waterController = {
  //ADD AUTHOR
  addWaterInfo: async (req, res) => {
    try {
      const newWater = new Water(req.body);
      const savedWater = await newWater.save();
      res.status(200).json(savedWater);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllWaterInfor: async (req, res) => {
    try {
      const waters = await Water.find();
      res.status(200).json(waters);
    } catch (error) {
      res.status(500).json;
    }
  },

  getWaterInforById: async (req, res) => {
    try {
      const waterRes = await Water.findById(req.params.id);
      res.status(200).json(waterRes);
    } catch (error) {
      res.status(500).json;
    }
  },

  updateWaterInforById: async (req, res) => {
    try {
      const id = req.params.id; // get the record need to update
      const result = await calcResult.water(req.body); // calculate result with req.body
      const updateValue = { ...req.body, result: result }; // create the new update value
      const water = await Water.findById(id); // get the old record
      await water.updateOne({ $set: updateValue }); // $set make unique value
      res.status(200).json({ ...updateValue, _id: id }); // return the update value
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteWaterInforById: async (req, res) => {
    try {
      await Water.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = waterController;
