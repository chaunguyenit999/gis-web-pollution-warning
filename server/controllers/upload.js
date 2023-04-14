const excelToJson = require("convert-excel-to-json");
const Air = require("../models/AirModel");
const path = require("path");
const fs = require("fs");
const Uploadfiles = async (req, res) => {
    try{
    const file = req.file.path
    const result = excelToJson({
        sourceFile: fs.readFileSync(file),
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
            I: "wind_direction",
            J: "pressure",
            K: "wind_dust",
            L: "sulfur_dioxide",
            M: "carbon_monoxide",
            N: "nito_dioxit",
        }
    })
    data = await Air.insertMany(result[1][1])
    }catch{
    res.status(500).json("ERROR")
    }}
const ShowData = async (req, res) => {
    res.render("../views/upload")
}
module.exports = {ShowData, Uploadfiles}