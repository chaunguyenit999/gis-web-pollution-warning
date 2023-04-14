const Air = require("../models/AirModel");

const resultAir = {
    result: async (id) => {
        try {
          const res = [];
          const air = await Air.findById(id);
          let res1, res2, res3
          //Bụi tổng
          /*
            1.Tốt: dưới 200 µg/m³
            2.Hơi tốt: từ 200 đến 300 µg/m³
            3.Trung bình: từ 300 đến 400 µg/m³
            4.Kém: từ 400 µg/m³
*/
          if (air.wind_dust < 200) {
            res1 = 1
          }else if( 200<= air.wind_dust && air.wind_dust < 300) {
            res1 = 2
          }else if(300 <= air.wind_dust && air.wind_dust < 400) {
            res1 = 3
          }else if( air.wind_dust >= 400) {
            res1 = 4 }
     
          //Sulfur_dioxide
          /*
            1.Cấp độ tốt: Lượng SO2 trong không khí là từ 0 đến 30 microgram/m3.
            2.Cấp độ trung bình: Lượng SO2 trong không khí là từ 30 đến 70 microgram/m3.
            3.Cấp độ không tốt cho sức khỏe: Lượng SO2 trong không khí là từ 70 đến 180 microgram/m3.
            4.Cấp độ nguy hại cho sức khỏe: Lượng SO2 trong không khí là từ 180 đến 300 microgram/m3.
*/
          if (air.sulfur_dioxide < 50) {
            res2 = 1
          }else if( 50 <= air.sulfur_dioxide && air.sulfur_dioxide < 70) {
            res2 = 2
          }else if(70 <= air.sulfur_dioxide && air.sulfur_dioxide < 100) {
            res2 = 3
          }else if( air.sulfur_dioxide >= 100) {
            res2 = 4 }

          //nito_dioxit
          /*
            1.Tốt: nồng độ NO2 dưới 35 µg/m³.
            2.Trung bình: nồng độ NO2 từ 35 đến 100 µg/m³.
            3.Kém: nồng độ NO2 từ 100 đến 200 µg/m³.
            4.Nguy hại cho sức khỏe: nồng độ NO2 từ 200 đến 400 µg/m³.
            5.Rất nguy hại cho sức khỏe: nồng độ NO2 trên 400 µg/m³.
*/
          if (air.nito_dioxit < 35) {
            res3 = 1
          }else if(35 <= air.nito_dioxit && air.nito_dioxit < 50) {
            res3 = 2
          }else if(50 <= air.nito_dioxit && air.nito_dioxit < 80) {
            res3 = 3
          }else if( air.nito_dioxit >= 80) {
            res3 = 4 }
  
        res.push(res1, res2, res3)

        const maxNum = Math.max(...res);
        
        return maxNum

      }catch (error) {
        console.error(error);
          throw new Error("Error in result function");
      }
}, 
};


module.exports = resultAir;