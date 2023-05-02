const xlsx = require('xlsx');
const Air = require("../models/AirModel")
const moment = require('moment');

const Uploadfiles = async (req, res) => {
    res.render("../views/upload")
}
const Import = async(req, res) => {
    // res.render("../views/table",{data:list_data[sheet]})
    data = await Air.insertMany(list_data[0])
    res.status(200).json("Ok")
}
const ReadExcel = async(req, res) => {
    const file = req.file.path
    const workbook = xlsx.readFile(file,{cellDates:true});
    const sheetName = workbook.SheetNames[5];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, range:3});

    
    // Lấy tiêu đề cột cần chuyển đổi thành key
    const result = [];

    // Lặp qua các dòng trong sheet, bắt đầu từ dòng thứ 2
    for (let i = 1; i < sheetData.length; i++) {
    const row = sheetData[i]
    // Tạo đối tượng JSON từ dữ liệu của mỗi dòng
        // const obj = {};
        // obj["location.address"] = row[1]
        // obj["location.latitude"] = row[2]
        // obj["location.longitude"] = row[3]
        // obj["date"] = new Date(row[4])
        // obj["wind_degree"] = row[5]
        // obj["humidity"] = row[6]
        // obj["wind_speed"] = row[7]
        // obj["wind_dust"] = row[8]
        // obj["sulfur_dioxide"] = row[9]
        // obj["nito_dioxit"] = row[10]
        // result.push(obj);
    
    // Chuyển đổi giá trị của cột thành key của đối tượng JSON
    }
    console.log(new Date("14/6/2017"))
    // data = await Air.insertMany(result)
    // res.send('Ok ')
}
module.exports = {Uploadfiles, Import, ReadExcel}