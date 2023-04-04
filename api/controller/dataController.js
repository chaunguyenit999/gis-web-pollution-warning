const mongoose = require('mongoose');

const dataAirQuality = require("../model/models.js");


const dataController = {
    getAll: async(req, res) => {
        try {
            const allData = await dataAirQuality.find({});
            res.render('../view/getall.ejs', { allData: allData });
        } catch (error) {
            res.status(500).json
        }
    },
    getOne: async(req, res) => {
        try {
            const add = req.params.add;
            const oneData = await dataAirQuality.findOne({"location.address": add})
            res.status(200).json(oneData);
        } catch (error) {
            res.status(500).json
        }
    },

    deleteOne: async(req, res) => {
        try {
            const id = req.params.id;
            await dataAirQuality.findOneAndDelete({"_id": id});
            const allData = await dataAirQuality.find({});
            res.render('../view/getall.ejs', { allData: allData });
        } catch (error) {
            res.status(500).json
        }
    },

    insert: async(req, res) =>{
        res.render('../view/insert.ejs')
        },
    insert2: async(req, res) =>{
        try {
            const newData = await dataAirQuality({
                location:{
                    address: req.body.address,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                },
                wind_degree: req.body.wind_degree,
                humidity: req.body.humidity,
                wind_speed: req.body.wind_speed,
                pressure: req.body.pressure,
                wind_dust: req.body.wind_dust,
                sulfur_dioxide: req.body.sulfur_dioxide,
                carbon_monoxide: req.body.carbon_monoxide,
                nito_dioxit: req.body.nito_dioxit,
                equivalent_noise: req.body.equivalent_noise,
                extreme_noise: req.body.extreme_noise
            
            });
            const saveData = await newData.save()
            res.status(200).json(saveData)
            }catch (error) {
                res.status(500).json({message:error.message});
            }
        },    
    update: async(req, res) => {
        try{
            const id = req.params.id;
            data = await dataAirQuality.findById(id);
            res.render('../view/update.ejs', { data: data})    
        }catch (error) {
                res.status(500).json({message: error});
            }
        },
    update2: async(req, res) => {
        try{
            const id = req.params.id;
            data = await dataAirQuality.findByIdAndUpdate(id,
                {
                    location:{
                        address: req.body.address,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude
                    },
                    wind_degree: req.body.wind_degree,
                    humidity: req.body.humidity,
                    wind_speed: req.body.wind_speed,
                    pressure: req.body.pressure,
                    wind_dust: req.body.wind_dust,
                    sulfur_dioxide: req.body.sulfur_dioxide,
                    carbon_monoxide: req.body.carbon_monoxide,
                    nito_dioxit: req.body.nito_dioxit,
                    equivalent_noise: req.body.equivalent_noise,
                    extreme_noise: req.body.extreme_noise
                
                },{ new: true });
            res.render('../view/update.ejs')    
        }catch (error) {
                res.status(500).json({message: error});
            }
        },    
}

module.exports = dataController;