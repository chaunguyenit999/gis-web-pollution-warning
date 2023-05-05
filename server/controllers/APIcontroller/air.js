const Air = require("../../models/AirModel");
const calcResult = require("../../helpers/calc-env_result");

const airController = {
  //ADD AUTHOR
  addAirInfo: async (req, res) => {
    try {
      const newAir = new Air(req.body);
      const savedAir = await newAir.save();
      res.status(200).json(savedAir);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllAirInfor: async (req, res) => {
    try {
      const airs = await Air.find();
      res.status(200).json(airs);
    } catch (error) {
      res.status(500).json;
    }
  },

  getAirInforById: async (req, res) => {
    try {
      const airRes= await Air.findById(req.params.id);
      res.status(200).json(airRes);
    } catch (error) {
      res.status(500).json;
    }
  },

  updateAirInforById: async (req, res) => {
    try {
      const id = req.params.id; // get the record need to update
      const result = await calcResult.air(req.body); // calculate result with req.body
      const updateValue = {...req.body, result: result}; // create the new update value
      const air = await Air.findById(id); // get the old record
      await air.updateOne({$set: updateValue}); // $set make unique value
      res.status(200).json({...updateValue, _id: id}); // return the update value
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteAirInforById: async (req, res) => {
    try {
      const id = req.params.id;
      await Air.findByIdAndDelete(id);
      res.status(200).json(id);
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = airController;
