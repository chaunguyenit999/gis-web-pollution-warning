const Soil = require("../models/SoilModel");
const resultSoil = require("./resultSoil.js");

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
      const soils = await Soil.find().sort({ date: 1 });
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




  //ADMIN
  getAllSoilInforAdmin: async(req, res) => {
    try {
        const soils = await Soil.find({});
        res.render('getAllInforSoils.ejs', { soils: soils });
    } catch (error) {
        res.status(500).json
    }
  },

  getOneSoilInforAdmin: async(req, res) => {
    try {
        const add = req.params.add;
        const oneData = await Soil.findOne({"location.address": add})
        res.status(200).json(oneData);
    } catch (error) {
        res.status(500).json
    }
  },

  deleteSoilInforByIdAdmin: async(req, res) => {
    try {
        const id = req.params.id;
        await Soil.findOneAndDelete({"_id": id});
        res.status(200).json("Deleted successfully!");
    } catch (error) {
        res.status(500).json
    }
  },

  addSoilInfoAdmin: async(req, res) =>{
    try {
        const newData = await Soil({
          location:{
              address: req.body.address,
              latitude: req.body.latitude,
              longitude: req.body.longitude
          },
          exchange_acidity: req.body.exchange_acidity,
          total_nitrogen: req.body.total_nitrogen,
          total_photpho: req.body.total_photpho,
          total_kali: req.body.total_kali,
          calci: req.body.calci,
          magie: req.body.magie,
          zinc: req.body.zinc,
          plumbum: req.body.plumbum,
          copper: req.body.copper,
          arsenic: req.body.arsenic
      });
        const saveData = await newData.save()
        const result = await resultSoil.result(saveData._id)
        await Soil.findByIdAndUpdate(saveData._id,{ result: result },{ new: true });
        res.status(200).json(saveData)
        }catch (error) {
            res.status(500).json({message:error.message});
        }
    },    
  updateSoilInforByIdAdmin: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Soil.findById(id);
        res.render('updateInforSoils.ejs', { data: data})    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },

  updateSoilInforByIdAdmin2: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Soil.findByIdAndUpdate(id, {$set: req.body }, { new: true });
        const result = await resultSoil.result(id)
        await Soil.findByIdAndUpdate(id,{ result: result },{ new: true });
        res.render('updateInforSoils.ejs')    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },    
};


module.exports = soilController;