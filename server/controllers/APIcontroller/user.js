const Soil = require("../../models/SoilModel");

const soilController = {
  //ADD AUTHOR
  addSoilInfo: async (req, res) => {
    try {
      const newSoil = new Soil(req.body);
      const savedSoil = await newSoil.save();
      res.status(200).json(savedSoil);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllSoilInfor: async (req, res) => {
    try {
      const soils = await Soil.find();
      res.status(200).json(soils);
    } catch (error) {
      res.status(500).json;
    }
  },

  getSoilInforById: async (req, res) => {
    try {
      const soilRes = await Soil.findById(req.params.id);
      res.status(200).json(soilRes);
    } catch (error) {
      res.status(500).json;
    }
  },

  updateSoilInforById: async (req, res) => {
    try {
      const soil = await Soil.findById(req.params.id);
      await soil.updateOne({ $set: req.body }); // in mongoDB 5.0 we can use the operator $set
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteSoilInforById: async (req, res) => {
    try {
      await Soil.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = soilController;
