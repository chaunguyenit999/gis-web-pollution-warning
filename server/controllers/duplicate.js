const Air = require("../models/AirModel")
const ids=[]
const checked = async(req, res, next) => {
try {
    await Air.aggregate([
        { $group: 
        { _id: { 
            longitude: "$location.longitude", 
            latitude: "$location.latitude" 
        },
        dups: {
            $addToSet: "$_id",
        },count: { 
            $sum: 1 
        },
        }},
        {
            $match:{
                count: {$gt:1 }
            }
        }
        ]).allowDiskUse().exec(function(err,data){
            for(i in data){
                ids.push(data[i].dups)
            }
            Air.deleteOne({"_id":{$in:ids[1]}})
            console.log(ids[1])
        })
    }catch(err) {
        console.error(err)
    }
    }
// checked.eachAsync((doc,i)=>{

// })

module.exports = checked

