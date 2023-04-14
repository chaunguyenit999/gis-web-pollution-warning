const Soil = require("../models/SoilModel");

const resultSoil = {
    result: async (id) => {
        try {
          const res = [];
          const soil = await Soil.findById(id);
          let res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11
          //pHKCl
          /*
            1.Đất tốt: từ trên 7.5 đến 8.5
            2.Ô nhiễm nhẹ: từ trên 6.5 đến 7.5
            3.Ô nhiễm trung bình: từ trên 5.5 đến 6.5
            4.Ô nhiễm nặng: từ trên 4.5 đến 5.5
            5.Ô nhiễm rất nặng: từ 4.5 xuống
*/
          if (7.5 < soil.exchange_acidity && soil.exchange_acidity <= 8.5) {
            res1 = 1
          }else if(6.5 < soil.exchange_acidity && soil.exchange_acidity <= 7.5) {
            res1 = 2
          }else if(5.5 < soil.exchange_acidity && soil.exchange_acidity <= 6.5) {
            res1 = 3
          }else if(4.5 < soil.exchange_acidity && soil.exchange_acidity <= 5.5) {
            res1 = 4
          }else if(soil.exchange_acidity <= 4.5) {
            res1 = 5 }
     
          //N Tổng số
          /*
            1.Đất tốt: dưới 0.2%
            2.Ô nhiễm nhẹ: từ 0.2% đến dưới 0.3%
            3.Ô nhiễm trung bình: từ 0.3% đến dưới 0.4%
            4.Ô nhiễm nặng: từ 0.4% đến dưới 0.5%
            5.Ô nhiễm rất nặng: từ 0.5%
*/
          if (soil.total_nitrogen < 0.2) {
            res2 = 1
          }else if(soil.total_nitrogen < 0.3) {
            res2 = 2
          }else if(soil.total_nitrogen < 0.4) {
            res2 = 3
          }else if(soil.total_nitrogen < 0.5) {
            res2 = 4
          }else if(soil.total_nitrogen >= 0.5) {
            res2 = 5 }
      
          //P Tổng số
          /*
            1.Đất tốt: dưới 0.02%
            2.Ô nhiễm nhẹ: từ 0.02% đến dưới 0.03%
            3.Ô nhiễm trung bình: từ 0.03% đến dưới 0.05%
            4.Ô nhiễm nặng: từ 0.05% đến dưới 0.1%
            5.Ô nhiễm rất nặng: dưới 0.1%
*/
          if (soil.total_photpho < 0.02) {
            res3 = 1
          }else if(soil.total_photpho < 0.03) {
            res3 = 2
          }else if(soil.total_photpho < 0.05) {
            res3 = 3
          }else if(soil.total_photpho < 0.1) {
            res3 = 4
          }else if(soil.total_photpho >= 0.1) {
            res3 = 5 }
 
          //K Tổng số
          /*
            1.Đất tốt: dưới 0.2%
            2.Ô nhiễm nhẹ: từ 0.2% đến dưới 0.4%
            3.Ô nhiễm trung bình: từ 0.4% đến dưới 0.6%
            4.Ô nhiễm nặng: từ 0.7% đến dưới 0.8%
            5.Ô nhiễm rất nặng: từ 0.8%
*/
          if (soil.total_kali < 0.2) {
            res4 = 1
          }else if(soil.total_kali < 0.4) {
            res4 = 2
          }else if(soil.total_kali < 0.6) {
            res4 = 3
          }else if(soil.total_kali < 0.8) {
            res4 = 4
          }else if(soil.total_kali >= 0.8) {
            res4 = 5 }

          //Ca2+
          /*
            1.Đất tốt: dưới 2,5 µS/m
            2.Ô nhiễm nhẹ: từ 2,5 đến dưới 7,5 µS/m
            3.Ô nhiễm trung bình: từ 7,5 đến dưới 25 µS/m
            4.Ô nhiễm nặng: từ 25 đến dưới 150 µS/m
            5.Ô nhiễm rất nặng: từ 150 µS/m
*/
          if (soil.calci < 2,5) {
            res5 = 1
          }else if(soil.calci < 7,5) {
            res5 = 2
          }else if(soil.calci < 25) {
            res5 = 3
          }else if(soil.calci < 150) {
            res5 = 4
          }else if(soil.calci >= 150) {
            res5 = 5 }

          //Mg2+
          /*
            1.Đất tốt: dưới 300 mg/L
            2.Ô nhiễm nhẹ: từ 300 đến dưới 600 mg/L
            3.Ô nhiễm trung bình: từ 600 đến dưới 900 mg/L
            4.Ô nhiễm nặng: từ 900 đến dưới 1200 mg/L
            5.Ô nhiễm rất nặng: từ 1200 mg/L
*/
          if (soil.magie < 300) {
            res6 = 1
          }else if(soil.magie < 600) {
            res6 = 2
          }else if(soil.magie < 900) {
            res6 = 3
          }else if(soil.magie < 1200) {
            res6 = 4
          }else if(soil.magie >= 1200) {
            res6 = 5 }

          //Zn
          /*
            1.Đất tốt: dưới 0,05 mg/L
            2.Ô nhiễm nhẹ: từ 0,05 đến dưới 0,1 mg/L
            3.Ô nhiễm trung bình: từ 0,1 đến dưới 1 mg/L
            4.Ô nhiễm nặng: từ 1 đến dưới 10 mg/L
            5.Ô nhiễm rất nặng: từ 10 mg/L
*/
          if (soil.zinc < 0,05) {
            res7 = 1
          }else if(soil.zinc < 0,1) {
            res7 = 2
          }else if(soil.zinc < 1) {
            res7 = 3
          }else if(soil.zinc < 10) {
            res7 = 4
          }else if(soil.zinc >= 10) {
            res7 = 5 }

          //Pb
          /*
            1.Đất tốt: dưới 10 mg/L
            2.Ô nhiễm nhẹ: từ 10 đến dưới 20 mg/L
            3.Ô nhiễm trung bình: từ 20 đến dưới 50 mg/L
            4.Ô nhiễm nặng: từ 50 đến dưới 100 mg/L
            5.Ô nhiễm rất nặng: từ 100 mg/L
*/
          if (soil.plumbum < 10) {
            res8 = 1
          }else if(soil.plumbum < 20) {
            res8 = 2
          }else if(soil.plumbum < 50) {
            res8 = 3
          }else if(soil.plumbum < 100) {
            res8 = 4
          }else if(soil.plumbum >= 100) {
            res8 = 5 }
            
          //Cu
          /*
            1.Đất tốt: dưới 0.2 mg/L
            2.Ô nhiễm nhẹ: từ 0.2 đến dưới 1 mg/L
            3.Ô nhiễm trung bình: từ 1 đến dưới 2 mg/L
            4.Ô nhiễm nặng: từ 2 đến dưới 5 mg/L
            5.Ô nhiễm rất nặng: từ 5 mg/L
*/
          if (soil.copper < 0.2) {
            res9 = 1
          }else if(soil.copper < 1) {
            res9 = 2
          }else if(soil.copper < 2) {
            res9 = 3
          }else if(soil.copper < 5) {
            res9 = 4
          }else if(soil.copper >= 5) {
            res9 = 5 } 
            
                      
          //As
          /*
            1.Đất tốt: dưới 0.01 mg/L
            2.Ô nhiễm nhẹ: từ 0.01 đến dưới 0.1 mg/L
            3.Ô nhiễm trung bình: từ 0.1 đến dưới 0.5 mg/L
            4.Ô nhiễm nặng: từ 0.5 đến dưới 1 mg/L
            5.Ô nhiễm rất nặng: từ 1 mg/L
*/
          if (soil.arsenic < 0.01) {
            res10 = 1
          }else if(soil.arsenic < 0.1) {
            res10 = 2
          }else if(soil.arsenic < 0.5) {
            res10 = 3
          }else if(soil.arsenic < 1) {
            res10 = 4
          }else if(soil.arsenic >= 1) {
            res10 = 5 }


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