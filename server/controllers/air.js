const Air = require("../models/AirModel");
const resultAir = require("./resultAir.js");

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


  //ADMIN
  getAllAirInforAdmin: async(req, res) => {
    try {
        const airs = await Air.find({});
        res.render('getAllInforAirs.ejs', { airs: airs });
    } catch (error) {
        res.status(500).json
    }
  },

  getOneAirInforAdmin: async(req, res) => {
    try {
        const add = req.params.add;
        const oneData = await Air.findOne({"location.address": add})
        res.status(200).json(oneData);
    } catch (error) {
        res.status(500).json
    }
  },

  deleteAirInforByIdAdmin: async(req, res) => {
    try {
        const id = req.params.id;
        await Air.findOneAndDelete({"_id": id});
        res.status(200).json("Deleted successfully!");
    } catch (error) {
        res.status(500).json
    }
  },

  addAirInfoAdmin: async(req, res) =>{
    try {
        const newData = await Air({
          location:{
              address: req.body.address,
              latitude: req.body.latitude,
              longitude: req.body.longitude
          },
          wind_degree: req.body.wind_degree,
          humidity: req.body.humidity,
          wind_speed: req.body.wind_speed,
          wind_direction: req.body.wind_direction,
          pressure: req.body.pressure,
          wind_dust: req.body.wind_dust,
          sulfur_dioxide: req.body.sulfur_dioxide,
          carbon_monoxide: req.body.carbon_monoxide,
          nito_dioxit: req.body.nito_dioxit,
          equivalent_noise: req.body.equivalent_noise,
          extreme_noise: req.body.extreme_noise
      
      });
        const saveData = await newData.save()
        const result = await resultAir.result(saveData._id)
        await Air.findByIdAndUpdate(saveData._id,{ result: result },{ new: true });
        res.status(200).json(saveData)
        }catch (error) {
            res.status(500).json({message:error.message});
        }
    },    
  updateAirInforByIdAdmin: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Air.findById(id);
        res.render('updateInforAirs.ejs', { data: data})    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },

  updateAirInforByIdAdmin2: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Air.findByIdAndUpdate(id,{ $set: req.body },{ new: true });
        const result = await resultAir.result(id)
        await Air.findByIdAndUpdate(id,{ result: result },{ new: true });
        res.render('updateInforAirs.ejs')    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },    
};

module.exports = airController;
