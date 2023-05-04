const Water = require("../models/WaterModel");
const resultWater = require("./resultWater.js");

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
      const waters = await Water.find().sort({ date: 1 });
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




  //ADMIN
  getAllWaterInforAdmin: async(req, res) => {
    try {
        const Waters = await Water.find({});
        res.render('getAllInforWaters.ejs', { Waters: Waters });
    } catch (error) {
        res.status(500).json
    }
  },

  getOneWaterInforAdmin: async(req, res) => {
    try {
        const add = req.params.add;
        const oneData = await Water.findOne({"location.address": add})
        res.status(200).json(oneData);
    } catch (error) {
        res.status(500).json
    }
  },

  deleteWaterInforByIdAdmin: async(req, res) => {
    try {
        const id = req.params.id;
        await Water.findOneAndDelete({"_id": id});
        res.status(200).json("Deleted successfully!");
    } catch (error) {
        res.status(500).json
    }
  },

  addWaterInfoAdmin: async(req, res) =>{
    try {
        const newData = await Water({
          location:{
              address: req.body.address,
              latitude: req.body.latitude,
              longitude: req.body.longitude
          },
          pH: req.body.pH,
          degree: req.body.degree,
          DO: req.body.DO,
          EC: req.body.EC,
          TDS: req.body.TDS,
          SS: req.body.SS,
          BOD5: req.body.BOD5,
          COD: req.body.COD,
          NO3: req.body.NO3,
          NH4: req.body.NH4,
          P3O4: req.body.P3O4,
          Coliform: req.body.Coliform,
          Oil: req.body.Oil
      
      });
        const saveData = await newData.save()
        const result = await resultWater.result(saveData._id)
        await Water.findByIdAndUpdate(saveData._id,{ result: result },{ new: true });
        res.status(200).json(saveData)
        }catch (error) {
            res.status(500).json({message:error.message});
        }
    },    
  updateWaterInforByIdAdmin: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Water.findById(id);
        res.render('updateInforWaters.ejs', { data: data})    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },

  updateWaterInforByIdAdmin2: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Water.findByIdAndUpdate(id, {$set: req.body }, { new: true });
        const result = await resultWater.result(id)
        await Water.findByIdAndUpdate(id,{ result: result },{ new: true });
        res.render('updateInforWaters.ejs')    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },    
};


module.exports = waterController;
