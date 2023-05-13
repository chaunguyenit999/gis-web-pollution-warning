const mongoose = require('mongoose');
const getAddress = require("../helpers/get_address")

const apiWeatherSchema = new mongoose.Schema({
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },
    aqi:{
        type:Number,
        required:true,
    }, 
    district_city:{
        type:String,
        require:true 
    },
    components:{
        co:{
            type:Number,
            required:true,
        },
        no:{
            type:Number,
            required:true,
        },
        no2:{
            type:Number,
            required:true,
        },
        o3:{
            type:Number,
            required:true,
        },
        so2:{
            type:Number,
            required:true,
        },
        pm2_5:{
            type:Number,
            required:true,
        },
        pm10:{
            type:Number,
            required:true,
        },
        nh3:{
            type:Number,
            required:true,
        }
    },
    date:{
        type: String,
        default: function () {
              const now = new Date();
              return now.toISOString();
            },
        }
})

module.exports = mongoose.model('apiweather', apiWeatherSchema);