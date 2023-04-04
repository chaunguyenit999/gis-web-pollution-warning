const dataAirQuality = require("../models/airQuality-schema");
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
        const data = await dataAirQuality({
            location:{
                address:"Ha Nam",
                latitude:20.5636293232319,
                longitude:105.855740838742
        },
            date: "12/18/2018",
            wind_degree: 22.8,
            humidity:70.5,
            wind_speed:0.5,
            wind_direction:"ĐB",
            pressure:100.4,
            wind_dust:712,
            sulfur_dioxide:109,
            carbon_monoxide:3000,
            nito_dioxit:87,
            equivalent_noise:73.8,
            extreme_noise:94.1
        }).save()
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