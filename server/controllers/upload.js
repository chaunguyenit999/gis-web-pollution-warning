const excelToJson = require("convert-excel-to-json");
const list_data = []
const Air = require("../models/AirModel")
const ShowData = async (req, res) => {
    try{
    const file = req.file.path
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
    for(i=0; i<result.length;i++){
        list_data.push(result[i]);
    }
    // data = await Air.insertMany(result[sheet][1])
    // res.render("../views/table",{data:result[sheet]})
    // res.status(200).json(Object.keys(result))
    res.render("../views/sheet",{data:Object.keys(result)})
    // res.redirect('/upload')
    }catch (error) {
        res.status(500).json(error);
    }
}
const Uploadfiles = async (req, res) => {
    res.render("../views/upload")
}
const Import = async(req, res) => {
    const sheet = req.body.sheet
    // res.render("../views/table",{data:list_data[sheet]})
    res.status(200).json("sheet")
}
module.exports = {ShowData, Uploadfiles, Import}