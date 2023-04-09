const Air = require("../models/AirModel");

const resultAir = {
    result1: async (id,) => {
        try {
          const air= await Air.findById(id);
          //Bụi mịn
          /*
            1.Tốt nhất: nồng độ PM2.5 dưới 10 µg/m³
            2.Tốt: nồng độ PM2.5 từ 10 đến 25 µg/m³
            3.Trung bình: nồng độ PM2.5 từ 25 đến 50 µg/m³
            4.Kém: nồng độ PM2.5 từ 50 đến 75 µg/m³
            5.Xấu: nồng độ PM2.5 trên 75 µg/m³
*/
          if (air.wind_dust < 10) {
            return 1
          }else if(10<= air.wind_dust && air.wind_dust < 25) {
            return 2
          }else if(25<= air.wind_dust && air.wind_dust < 50) {
            return 3
          }else if(50<= air.wind_dust && air.wind_dust < 75) {
            return 4
          }else if(air.wind_dust >= 75) {
            return 5 }
        } catch (error) {
          console.error(error);
          throw new Error("Error in result1 function");
        }
      },

      result2: async (id) => {
        try {
          const air= await Air.findById(id);
          //Sulfur_dioxide
          /*
            1.ấp độ tốt: Lượng SO2 trong không khí là từ 0 đến 35 microgram/m3.
            2.Cấp độ trung bình: Lượng SO2 trong không khí là từ 35 đến 75 microgram/m3.
            3.Cấp độ không tốt cho sức khỏe: Lượng SO2 trong không khí là từ 75 đến 185 microgram/m3.
            4.Cấp độ nguy hại cho sức khỏe: Lượng SO2 trong không khí là từ 185 đến 304 microgram/m3.
            5.Cấp độ rất nguy hại cho sức khỏe: Lượng SO2 trong không khí vượt quá 304 microgram/m3.
*/
          if (air.sulfur_dioxide < 35) {
            return 1
          }else if(35<= air.sulfur_dioxide && air.sulfur_dioxide < 75) {
            return 2
          }else if(75<= air.sulfur_dioxide && air.sulfur_dioxide < 185) {
            return 3
          }else if(185<= air.sulfur_dioxide && air.sulfur_dioxide < 304) {
            return 4
          }else if(air.wind_dust >= 304) {
            return 5 }
        } catch (error) {
          console.error(error);
          throw new Error("Error in result2 function");
        }
      },


      result3: async (id) => {
        try {
          const air= await Air.findById(id);
          //carbon_monoxide
          /*
            1.Tốt: nồng độ CO dưới 9 ppm trong vòng 8 giờ hoặc dưới 35 ppm trong vòng 1 giờ.
            2.Trung bình: nồng độ CO từ 9 đến 35 ppm trong vòng 8 giờ hoặc từ 35 đến 50 ppm trong vòng 1 giờ.
            3.Kém: nồng độ CO từ 35 đến 50 ppm trong vòng 8 giờ hoặc từ 50 đến 100 ppm trong vòng 1 giờ.
            4.Nguy hại cho sức khỏe: nồng độ CO từ 50 đến 100 ppm trong vòng 8 giờ hoặc từ 100 đến 200 ppm trong vòng 1 giờ.
            5.Rất nguy hại cho sức khỏe: nồng độ CO trên 100 ppm trong vòng 8 giờ hoặc trên 200 ppm trong vòng 1 giờ.
*/
          if (air.carbon_monoxide < 3500) {
            return 1
          }else if(3500<= air.carbon_monoxide && air.carbon_monoxide < 7500) {
            return 2
          }else if(7500<= air.scarbon_monoxide && air.carbon_monoxide < 18500) {
            return 3
          }else if(18500<= air.carbon_monoxide && air.carbon_monoxide < 30400) {
            return 4
          }else if(air.carbon_monoxide >= 30400) {
            return 5 }
        } catch (error) {
          console.error(error);
          throw new Error("Error in result3 function");
        }
      },

      result4: async (id) => {
        try {
          const air= await Air.findById(id);
          //carbon_monoxide
          /*
            1.Tốt: nồng độ NO2 dưới 40 µg/m³.
            2.Trung bình: nồng độ NO2 từ 40 đến 100 µg/m³.
            3.Kém: nồng độ NO2 từ 100 đến 200 µg/m³.
            4.Nguy hại cho sức khỏe: nồng độ NO2 từ 200 đến 400 µg/m³.
            5.Rất nguy hại cho sức khỏe: nồng độ NO2 trên 400 µg/m³.
*/
          if (air.carbon_monoxide < 40) {
            return 1
          }else if(40<= air.carbon_monoxide && air.carbon_monoxide < 100) {
            return 2
          }else if(100<= air.scarbon_monoxide && air.carbon_monoxide < 200) {
            return 3
          }else if(200<= air.carbon_monoxide && air.carbon_monoxide < 400) {
            return 4
          }else if(air.carbon_monoxide >= 400) {
            return 5 }
        } catch (error) {
          console.error(error);
          throw new Error("Error in result4 function");
        }
      },
    result: async (id) => {
      try {
        const res = []
        const res1 = result1(id)
        const res2 = result2(id)
        const res3 = result3(id)
        const res4 = result4(id)
        res.push(res1, res2, res3, res4)

        const maxNum = Math.max(...res);
        if(maxNum == 5) {
          return "Ô nhiễm mức 1"
        }else if(maxNum == 4){
          return "Ô nhiễm mức 2"
        }else if(maxNum == 3){
          return "Ô nhiễm mức 3"
        }else if(maxNum == 2){
          return "Ô nhiễm mức 4"
        }else if(maxNum == 1){
          return "Ô nhiễm mức 5"
        }

      }catch (error) {
        console.error(error);
          throw new Error("Error in result3 function");
      }
}, 
};


module.exports = resultAir;