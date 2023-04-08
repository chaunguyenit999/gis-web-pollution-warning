const Water = require("../models/WaterModel");

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
      const water = await Water.findById(req.params.id);
      await water.updateOne({ $set: req.body }); // in mongoDB 5.0 we can use the operator $set
      res.status(200).json("Updated successfully!");
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
