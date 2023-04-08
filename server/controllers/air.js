const Air = require("../models/AirModel");

const airController = {
  //ADD AUTHOR
  addAirInfo: async (req, res) => {
    try {
      reqData = req.body;
      const newAir = new Air(req.body);
      const savedAir = await newAir.save();
      res.status(200).json(savedAir);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllAirInfor: async (req, res) => {
    try {
      const allData = await Air.find();
      res.status(200).json(allData);
    } catch (error) {
      res.status(500).json;
    }
  },

  getAirInforById: async (req, res) => {
    try {
      const id = req.params.id;
      const oneData = await Air.findById(id);
      res.status(200).json(oneData);
    } catch (error) {
      res.status(500).json;
    }
  },

  updateAirInforById: async (req, res) => {
    try {
      const air = await Air.findById(req.params.id);
      await air.updateOne({ $set: req.body }); // in mongoDB 5.0 we can use the operator $set
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteAirInforById: async (req, res) => {
    try {
      await Air.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = airController;
