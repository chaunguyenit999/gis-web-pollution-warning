const Air = require("../models/AirModel");

const resultAir = {
    result: async (id) => {
        try {
          const res = [];
          const air= await Air.findById(id);
          let res1, res2, res3, res4
          //Bụi mịn
          /*
            1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
            2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
            3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
            4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
            5.Xấu: nồng độ PM2.5 trên 75 µg/m³
*/
          if (air.wind_dust < 10) {
            res1 = 1
          }else if(10<= air.wind_dust && air.wind_dust < 25) {
            res1 = 2
          }else if(25<= air.wind_dust && air.wind_dust < 50) {
            res1 = 3
          }else if(50<= air.wind_dust && air.wind_dust < 75) {
            res1 = 4
          }else if(air.wind_dust >= 75) {
            res1 = 5 }
     
          //Sulfur_dioxide
          /*
            1.Cấp độ tốt: Lượng SO2 trong không khí là từ 0 đến 35 microgram/m3.
            2.Cấp độ trung bình: Lượng SO2 trong không khí là từ 35 đến 75 microgram/m3.
            3.Cấp độ không tốt cho sức khỏe: Lượng SO2 trong không khí là từ 75 đến 185 microgram/m3.
            4.Cấp độ nguy hại cho sức khỏe: Lượng SO2 trong không khí là từ 185 đến 304 microgram/m3.
            5.Cấp độ rất nguy hại cho sức khỏe: Lượng SO2 trong không khí vượt quá 304 microgram/m3.
*/
          if (air.sulfur_dioxide < 35) {
            res2 = 1
          }else if(35<= air.sulfur_dioxide && air.sulfur_dioxide < 75) {
            res2 = 2
          }else if(75<= air.sulfur_dioxide && air.sulfur_dioxide < 185) {
            res2 = 3
          }else if(185<= air.sulfur_dioxide && air.sulfur_dioxide < 304) {
            res2 = 4
          }else if(air.sulfur_dioxide >= 304) {
            res2 = 5 }

          //nito_dioxit
          /*
            1.Tốt: nồng độ NO2 dưới 40 µg/m³.
            2.Trung bình: nồng độ NO2 từ 40 đến 100 µg/m³.
            3.Kém: nồng độ NO2 từ 100 đến 200 µg/m³.
            4.Nguy hại cho sức khỏe: nồng độ NO2 từ 200 đến 400 µg/m³.
            5.Rất nguy hại cho sức khỏe: nồng độ NO2 trên 400 µg/m³.
*/
          if (air.nito_dioxit < 40) {
            res4 = 1
          }else if(40<= air.nito_dioxit && air.nito_dioxit < 100) {
            res4 = 2
          }else if(100<= air.nito_dioxit && air.nito_dioxit < 200) {
            res4 = 3
          }else if(200<= air.nito_dioxit && air.nito_dioxit < 400) {
            res4 = 4
          }else if(air.nito_dioxit >= 400) {
            res4 = 5 }
  
        res.push(res1, res2, res4)

        const maxNum = Math.max(...res);
        
        return maxNum

      }catch (error) {
        console.error(error);
          throw new Error("Error in result function");
      }
}, 
};


module.exports = resultAir;