const excelToJson = require("convert-excel-to-json");
const Air = require("../models/AirModel");
const Uploadfiles = async (req, res) => {
    try{
    const file = req.file.path
    // const sheet = req.data.sheet
    // const quanlity = req.data.quanlity
    const result = excelToJson({
        sourceFile: file,
        header: {
            rows: 3
        },
        columnToKey:{
            B:"location.address",
            C: "location.latitude",
            D: "location.longitude",
            E: "date",
            F: "wind_degree",
            G: "humidity",
            H: "wind_speed",
            I: "wind_dust",
            J: "sulfur_dioxide",
            K: "nito_dioxit",
        }
    })
    data = await Air.insertMany(result["2018_12"])
    // res.status(200).json(result["2018_02"])
    // res.redirect('/upload')
    }catch (error) {
        res.status(500).json(error);
      }}
const ShowData = async (req, res) => {
    res.render("../views/upload")
}
module.exports = {ShowData, Uploadfiles}