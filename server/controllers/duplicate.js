const Air = require("../models/AirModel")
const checked = async(req, res, next) => {
try {
    await Air.aggregate([
        { $group: 
        { _id: { 
            longitude: "$location.longitude", 
            latitude: "$location.latitude", 
            address: "$location.address",
            date: "$date",
        },
        dups: {
            $push: "$_id",
        },count: { 
            $sum: 1 
        },
        }},
        {
            $match:{
                count: {$gt:1 }
            }
        }
        ], function(err, results) {
            if (err) throw err;
            results.forEach(function(result) {
                Air.deleteMany({ _id: { $in: result.dups.slice(1) }}, function(err) {
                if (err) throw err;
                console.log("Deleted " + (result.dups.length - 1) + " duplicate documents.");
                });
                // console.log("Deleted " + result.dups.length + " duplicate documents")
            });
            // console.log(results)
            });
    }catch(err) {
        console.error(err)
    }
    }
// checked.eachAsync((doc,i)=>{

// })

module.exports = checked

