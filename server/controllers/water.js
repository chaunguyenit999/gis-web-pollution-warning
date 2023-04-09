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
    } catch (error) {
        res.status(500).json
    }
  },

  addWaterInfoAdmin: async(req, res) =>{
    try {
        const newData = await Water(req.body);
        const saveData = await newData.save()
        }catch (error) {
            res.status(500).json({message:error.message});
        }
    },    
  updateWaterInforByIdAdmin: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Water.findById(id);
        res.render('../view/update.ejs', { data: data})    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },

  updateWaterInforByIdAdmin2: async(req, res) => {
    try{
        const id = req.params.id;
        data = await Water.findByIdAndUpdate(id, {$set: req.body }, { new: true });
        res.render('../view/update.ejs')    
    }catch (error) {
            res.status(500).json({message: error});
        }
    },    
};