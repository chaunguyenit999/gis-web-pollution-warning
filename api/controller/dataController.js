const mongoose = require('mongoose');

const airQuality = mongoose.model('airqualities', {});

const dataController = {
    getAllData: async(req, res) => {
        try {
            const allData = await airQuality.find({});
            res.status(200).json(allData);
            //return render("../controller/update.html", allData=allData)
        } catch (error) {
            res.status(500).json
        }
    },
    getAData: async(req, res) => {
        try {
            //lat = request.args.get("lat")
            //long = request.args.get("long")
            const add = req.query.add;
            //const lat = parseInt(req.query.lat);
            //const long = parseInt(req.query.long);
            const aData = await airQuality.findOne({address: add})
            //document.getElementById("info").value = json(aData)
            //return render("../controller/update.html", aData=aData)
            res.status(200).json(aData);
        } catch (error) {
            res.status(500).json
        }
    },
    addAData: async(req, res) => {
        try {
            //lat = request.args.get("lat")
            //long = request.args.get("long")
            
            const aData = new airQuality(req.query)
            aData.save()
            //document.getElementById("info").value = json(aData)
            //return render("../controller/update.html", aData=aData)
            res.status(200).json(aData);
        } catch (error) {
            res.status(500).json
        }
    },
    deleteAData: async(req, res) => {
        try {
            const add = req.query.add;
            const lat = parseInt(req.query.lat);
            const long = parseInt(req.query.long);
            await airQuality.findOneAndDelete({location: {address: add, latitude: lat,  longitude: long}});
            res.status(200).json('Đã xóa');
        } catch (error) {
            res.status(500).json
        }
    }, 
}

module.exports = dataController;