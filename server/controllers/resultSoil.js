const Soil = require("../models/SoilModel");

const resultSoil = {
    result: async (id) => {
        try {
          const res = [];
          const soil = await Soil.findById(id);
          let res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11
          //pHKCl
          /*
            1.Đất tốt: từ trên 6.5 
            2.Ô nhiễm nhẹ: từ trên 5.5 đến 6.5
            3.Ô nhiễm trung bình: từ trên 4.5 đến 5.5
            4.Ô nhiễm nặng: từ 4.5 xuống
*/
          if (soil.exchange_acidity > 6.5) {
            res1 = 1
          }else if(soil.exchange_acidity > 5.5) {
            res1 = 2
          }else if(soil.exchange_acidity > 4.5) {
            res1 = 3
          }else if(soil.exchange_acidity <= 4.5) {
            res1 = 4 }
     
          //N Tổng số
          /*
            1.Đất tốt: dưới 0.2%
            2.Ô nhiễm nhẹ: từ 0.2% đến dưới 0.3%
            3.Ô nhiễm trung bình: từ 0.3% đến dưới 0.4%
            4.Ô nhiễm nặng: từ 0.4% 
*/
          if (soil.total_nitrogen < 0.2) {
            res2 = 1
          }else if(soil.total_nitrogen < 0.3) {
            res2 = 2
          }else if(soil.total_nitrogen < 0.4) {
            res2 = 3
          }else if(soil.total_nitrogen >= 0.4) {
            res2 = 4 }
      
          //P Tổng số
          /*
            1.Đất tốt: dưới 0.05%
            2.Ô nhiễm nhẹ: từ 0.05% đến dưới 0.1%
            3.Ô nhiễm trung bình: từ 0.1% đến dưới 0.15%
            4.Ô nhiễm nặng: từ 0.15% 
*/
          if (soil.total_photpho < 0.05) {
            res3 = 1
          }else if(soil.total_photpho < 0.1) {
            res3 = 2
          }else if(soil.total_photpho < 0.15) {
            res3 = 3
          }else if(soil.total_photpho >= 0.15) {
            res3 = 4 }
 
          //K Tổng số
          /*
            1.Đất tốt: dưới 0.1%
            2.Ô nhiễm nhẹ: từ 0.2% đến dưới 0.2%
            3.Ô nhiễm trung bình: từ 0.2% đến dưới 0.4%
            4.Ô nhiễm nặng: từ 0.4%
*/
          if (soil.total_kali < 0.1) {
            res4 = 1
          }else if(soil.total_kali < 0.2) {
            res4 = 2
          }else if(soil.total_kali < 0.4) {
            res4 = 3
          }else if(soil.total_kali >= 0.4) {
            res4 = 4 }

          //Ca2+
          /*
            1.Đất tốt: dưới 5000 mg/kg
            2.Ô nhiễm nhẹ: từ 5000 đến dưới 7000 mg/kg
            3.Ô nhiễm trung bình: từ 7000 đến dưới 10000 mg/kg
            4.Ô nhiễm nặng: từ 10000 mg/kg
*/
          if (soil.calci < 5000) {
            res5 = 1
          }else if(soil.calci < 7000) {
            res5 = 2
          }else if(soil.calci < 10000) {
            res5 = 3
          }else if(soil.calci >= 10000) {
            res5 = 4 }

          //Mg2+
          /*
            1.Đất tốt: dưới 500 mg/kg
            2.Ô nhiễm nhẹ: từ 500 đến dưới 700 mg/kg
            3.Ô nhiễm trung bình: từ 700 đến dưới 1000 mg/kg
            4.Ô nhiễm nặng: từ 1000 mg/kg
*/
          if (soil.magie < 500) {
            res6 = 1
          }else if(soil.magie < 700) {
            res6 = 2
          }else if(soil.magie < 1000) {
            res6 = 3
          }else if(soil.magie >= 1000) {
            res6 = 4 }

          //Zn
          /*
            1.Đất tốt: dưới 50 mg/kg
            2.Ô nhiễm nhẹ: từ 50 đến dưới 70 mg/kg
            3.Ô nhiễm trung bình: từ 70 đến dưới 100 mg/kg
            4.Ô nhiễm nặng: từ 100 mg/kg
*/
          if (soil.zinc < 50) {
            res7 = 1
          }else if(soil.zinc < 70) {
            res7 = 2
          }else if(soil.zinc < 100) {
            res7 = 3
          }else if(soil.zinc >= 100) {
            res7 = 4 }

          //Pb
          /*
            1.Đất tốt: dưới 20 mg/kg
            2.Ô nhiễm nhẹ: từ 20 đến dưới 40 mmg/kg
            3.Ô nhiễm trung bình: từ 40 đến dưới 70 mg/kg
            4.Ô nhiễm nặng: từ 70 mg/kg
*/
          if (soil.plumbum < 20) {
            res8 = 1
          }else if(soil.plumbum < 40) {
            res8 = 2
          }else if(soil.plumbum < 70) {
            res8 = 3
          }else if(soil.plumbum >= 70) {
            res8 = 4 }
            
          //Cu
          /*
            1.Đất tốt: dưới 30 mg/kg
            2.Ô nhiễm nhẹ: từ 30 đến dưới 50 mg/kg
            3.Ô nhiễm trung bình: từ 50 đến dưới 80 mg/kg
            4.Ô nhiễm nặng: từ 80 mg/kg
*/
          if (soil.copper < 30) {
            res9 = 1
          }else if(soil.copper < 50) {
            res9 = 2
          }else if(soil.copper < 80) {
            res9 = 3
          }else if(soil.copper >= 80) {
            res9 = 4 } 
            
                      
          //As
          /*
            1.Đất tốt: dưới 5 mg/kg
            2.Ô nhiễm nhẹ: từ 5 đến dưới 7 mmg/kg
            3.Ô nhiễm trung bình: từ 7 đến dưới 9 mg/kg
            4.Ô nhiễm nặng: từ 9 mg/kg
*/
          if (soil.arsenic < 5) {
            res10 = 1
          }else if(soil.arsenic < 7) {
            res10 = 2
          }else if(soil.arsenic < 9) {
            res10 = 3
          }else if(soil.arsenic >= 9) {
            res10 = 4 }


        res.push(res1, res2, res3, res4, res5, res6, res7, res8, res9, res10)

        const maxNum = Math.max(...res);
        
        return maxNum

      }catch (error) {
        console.error(error);
          throw new Error("Error in result function");
      }
}, 
};


module.exports = resultSoil;