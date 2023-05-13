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
    distric_city:{
        type:String,
        require:true 
    },
    main:{
        aqi:{
            type:Number,
            required:true,
        }
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

apiWeatherSchema.pre("save", async function () {
    // let tsp = this.tsp;
    // let so2 = this.so2;
    // let no2 = this.no2;
    let lat = this.latitude;
    let long = this.longitude;
    let getAddressInfo = await getAddress(
        {
            lat,
            long,
            distric_city: true
        }
    )

    if(getAddressInfo) {
        this.distric_city = distric_city;
    }
  });


module.exports = mongoose.model('apiweather', apiWeatherSchema);