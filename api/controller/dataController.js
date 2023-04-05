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
}

module.exports = dataController