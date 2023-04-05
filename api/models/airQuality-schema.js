const mongoose = require('mongoose')

const airQualitySchema = new mongoose.Schema({
    location:{
        address:{
            type:String,
            required:true,
        },
        latitude:{
            type:Number,
            required:true,
        },
        longitude:{
            type:Number,
            required:true,
        }
    },
    date:{
        type:String,
        default: Date.now(),
    },
    wind_degree:{
        type:Number,
        required:true,
    },
    humidity:{
        type:Number,
        required:true,
    },
    wind_speed:{
        type:Number,
        required:true,
    },
    wind_direction:{
        type:String,
        required:true,
    },
    pressure:{
        type:Number,
        required:true,
    },
    wind_dust:{
        type:Number,
        required:true,
    },
    sulfur_dioxide:{
        type:Number,
        required:true,
    },
    carbon_monoxide:{
        type:String,
        required:true,
    },
    nito_dioxit:{
        type:Number,
        required:true,
    },
    equivalent_noise:{
        type:Number,
        default:0,
    },
    extreme_noise:{
        type:Number,
        default:0,
    },
    

})
module.exports = mongoose.model('airQuality', airQualitySchema);