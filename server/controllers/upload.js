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
            K: "wind_dust",
            L: "sulfur_dioxide",
            N: "nito_dioxit",
        }
    })
    // data = await Air.insertMany(result[5])
    res.status(200).json(result[6][1])
    // res.redirect('/upload')
    }catch{
    res.status(500).json("ERROR")
    }}
const ShowData = async (req, res) => {
    res.render("../views/upload")
}
module.exports = {ShowData, Uploadfiles}