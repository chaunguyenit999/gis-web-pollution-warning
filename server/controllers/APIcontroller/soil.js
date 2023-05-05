const Soil = require("../../models/SoilModel");
const calcResult = require("../../helpers/calc-env_result");

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
      const id = req.params.id; // get the record need to update
      const result = await calcResult.soil(req.body); // calculate result with req.body
      const updateValue = { ...req.body, result: result }; // create the new update value
      const soil = await Soil.findById(id); // get the old record
      await soil.updateOne({ $set: updateValue }); // $set make unique value
      res.status(200).json({ ...updateValue, _id: id }); // return the update value
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
