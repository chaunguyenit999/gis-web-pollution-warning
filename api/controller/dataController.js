<<<<<<< HEAD
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
=======
const dataAirQuality = require("../models/airQuality-schema");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const dataController = {
    getData : async(req, res) =>{
    try{
        const data = await dataAirQuality.findOne({_id:"642a5a84b77cb5936c77737e"})
        res.status(200).json(data.humidity)
    }catch(err){
        res.status(500).json({message: err});
    }
    },
    insertData: async(req, res) =>{
        try {
            const result = excelToJson({
                source: fs.readFileSync('Không_Khí_2018.xlsx'),
                  columnToKey: {
                    A:'location.address',
                    B:'location.latitude',
                    C:"location.longitude",
                    D:"date",
                    E:"wind_degree",
                    F:"humidity",
                    G:"wind_speed",
                    H:"wind_direction",
                    I:"pressure",
                    J:"wind_dust",
                    K:"sulfur_dioxide",
                    L:"carbon_monoxide",
                    M:"nito_dioxit",
                    N:"equivalent_noise",
                    O:"extreme_noise",
                  }
              });
        const data = await dataAirQuality.insertMany(result.data1)
        res.status(200).json(data)
        }catch (error) {
            res.status(500).json({message:error.message});
        }
    },
    updateData: async(req, res) => {
        try{
            updateData = await dataAirQuality.updateOne(
                {
                    location:{
                        address:"Ha Tay",
                        latitude:324,
                        longitude:342
                }
                },
                {
                    location:{
                        address:"Ha NAm",
                        latitude:324,
                        longitude:342
                }
                }
            );
            res.status(200).json(updateData);    
        }catch (error) {
            res.status(500).json({message: error});
        }
    },data_partition: async(req, res)=>{
        try {
            const data = await dataAirQuality.find({})
            for(let i=0; i<data.length; i++) {
                console.log(data[i])
            }
            res.send('Ok')
        }catch(e){}
    }
>>>>>>> long
}

module.exports = dataController