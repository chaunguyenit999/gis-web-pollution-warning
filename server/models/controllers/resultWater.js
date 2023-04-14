const Water = require("../models/WaterModel");

const resultWater = {
    result: async (id) => {
        try {
          const res = [];
          const water = await Water.findById(id);
          let res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11
          //BOD5
          /*
            1.Nước tốt: dưới 3 mg/L
            2.Ô nhiễm nhẹ: từ 3 đến dưới 6 mg/L
            3.Ô nhiễm trung bình: từ 6 đến dưới 20 mg/L
            4.Ô nhiễm nặng: từ 20 đến dưới 30 mg/L
            5.Ô nhiễm rất nặng: từ 30 mg/L
*/
          if (water.BOD5 < 3) {
            res1 = 1
          }else if(water.BOD5 < 6) {
            res1 = 2
          }else if(water.BOD5 < 20) {
            res1 = 3
          }else if(water.BOD5 < 30) {
            res1 = 4
          }else if(water.BOD5 >= 30) {
            res1 = 5 }
     
          //COD
          /*
            1.Nước tốt: dưới 10 mg/L
            2.Ô nhiễm nhẹ: từ 10 đến dưới 30 mg/L
            3.Ô nhiễm trung bình: từ 30 đến dưới 100 mg/L
            4.Ô nhiễm nặng: từ 100 đến dưới 200 mg/L
            5.Ô nhiễm rất nặng: từ 200 mg/L
*/
          if (water.COD < 10) {
            res2 = 1
          }else if(water.COD < 30) {
            res2 = 2
          }else if(water.COD < 100) {
            res2 = 3
          }else if(water.COD < 200) {
            res2 = 4
          }else if(water.COD >= 200) {
            res2 = 5 }
      
          //DO
          /*
            1.Nước tốt: từ 6 mg/L
            2.Ô nhiễm nhẹ: từ 5 đến dưới 6 mg/L
            3.Ô nhiễm trung bình: từ 3 đến dưới 5 mg/L
            4.Ô nhiễm nặng: từ 2 đến dưới 3 mg/L
            5.Ô nhiễm rất nặng: dưới 2 mg/L
*/
          if (water.DO >= 6) {
            res3 = 1
          }else if(5 <= water.DO && water.DO < 6) {
            res3 = 2
          }else if(3 <= water.DO && water.DO < 5) {
            res3 = 3
          }else if(2 <= water.DO && water.DO < 3) {
            res3 = 4
          }else if(water.DO < 2) {
            res3 = 5 }
 
          //SS
          /*
            1.Nước tốt: dưới 10 mg/L
            2.Ô nhiễm nhẹ: từ 10 đến dưới 50 mg/L
            3.Ô nhiễm trung bình: từ 50 đến dưới 100 mg/L
            4.Ô nhiễm nặng: từ 100 đến dưới 200 mg/L
            5.Ô nhiễm rất nặng: từ 200 mg/L
*/
          if (water.SS < 40) {
            res4 = 1
          }else if(water.SS < 100) {
            res4 = 2
          }else if(water.SS < 200) {
            res4 = 3
          }else if(water.SS < 400) {
            res4 = 4
          }else if(water.SS >= 400) {
            res4 = 5 }

          //EC
          /*
            1.Nước tốt: dưới 2,5 µS/m
            2.Ô nhiễm nhẹ: từ 2,5 đến dưới 7,5 µS/m
            3.Ô nhiễm trung bình: từ 7,5 đến dưới 25 µS/m
            4.Ô nhiễm nặng: từ 25 đến dưới 150 µS/m
            5.Ô nhiễm rất nặng: từ 150 µS/m
*/
          if (water.EC < 2,5) {
            res5 = 1
          }else if(water.EC < 7,5) {
            res5 = 2
          }else if(water.EC < 25) {
            res5 = 3
          }else if(water.EC < 150) {
            res5 = 4
          }else if(water.EC >= 150) {
            res5 = 5 }

          //TDS
          /*
            1.Nước tốt: dưới 300 mg/L
            2.Ô nhiễm nhẹ: từ 300 đến dưới 600 mg/L
            3.Ô nhiễm trung bình: từ 600 đến dưới 900 mg/L
            4.Ô nhiễm nặng: từ 900 đến dưới 1200 mg/L
            5.Ô nhiễm rất nặng: từ 1200 mg/L
*/
          if (water.TDS < 300) {
            res6 = 1
          }else if(water.TDS < 600) {
            res6 = 2
          }else if(water.TDS < 900) {
            res6 = 3
          }else if(water.TDS < 1200) {
            res6 = 4
          }else if(water.TDS >= 1200) {
            res6 = 5 }

          //NO2-
          /*
            1.Nước tốt: dưới 0,05 mg/L
            2.Ô nhiễm nhẹ: từ 0,05 đến dưới 0,1 mg/L
            3.Ô nhiễm trung bình: từ 0,1 đến dưới 1 mg/L
            4.Ô nhiễm nặng: từ 1 đến dưới 10 mg/L
            5.Ô nhiễm rất nặng: từ 10 mg/L
*/
          if (water.NO2 < 0,05) {
            res7 = 1
          }else if(water.NO2 < 0,1) {
            res7 = 2
          }else if(water.NO2 < 1) {
            res7 = 3
          }else if(water.NO2 < 10) {
            res7 = 4
          }else if(water.NO2 >= 10) {
            res7 = 5 }

          //NO3-
          /*
            1.Nước tốt: dưới 10 mg/L
            2.Ô nhiễm nhẹ: từ 10 đến dưới 20 mg/L
            3.Ô nhiễm trung bình: từ 20 đến dưới 50 mg/L
            4.Ô nhiễm nặng: từ 50 đến dưới 100 mg/L
            5.Ô nhiễm rất nặng: từ 100 mg/L
*/
          if (water.NO3 < 10) {
            res8 = 1
          }else if(water.NO3 < 20) {
            res8 = 2
          }else if(water.NO3 < 50) {
            res8 = 3
          }else if(water.NO3 < 100) {
            res8 = 4
          }else if(water.NO3 >= 100) {
            res8 = 5 }
            
          //NH4+
          /*
            1.Nước tốt: dưới 0.2 mg/L
            2.Ô nhiễm nhẹ: từ 0.2 đến dưới 1 mg/L
            3.Ô nhiễm trung bình: từ 1 đến dưới 2 mg/L
            4.Ô nhiễm nặng: từ 2 đến dưới 5 mg/L
            5.Ô nhiễm rất nặng: từ 5 mg/L
*/
          if (water.NH4 < 0.2) {
            res9 = 1
          }else if(water.NH4 < 1) {
            res9 = 2
          }else if(water.NH4 < 2) {
            res9 = 3
          }else if(water.NH4 < 5) {
            res9 = 4
          }else if(water.NH4 >= 5) {
            res9 = 5 } 
            
                      
          //P3O4-
          /*
            1.Nước tốt: dưới 0.01 mg/L
            2.Ô nhiễm nhẹ: từ 0.01 đến dưới 0.1 mg/L
            3.Ô nhiễm trung bình: từ 0.1 đến dưới 0.5 mg/L
            4.Ô nhiễm nặng: từ 0.5 đến dưới 1 mg/L
            5.Ô nhiễm rất nặng: từ 1 mg/L
*/
          if (water.P3O4 < 0.01) {
            res10 = 1
          }else if(water.P3O4 < 0.1) {
            res10 = 2
          }else if(water.P3O4 < 0.5) {
            res10 = 3
          }else if(water.P3O4 < 1) {
            res10 = 4
          }else if(water.P3O4 >= 1) {
            res10 = 5 }
            
          //Oil
          /*
            1.Nước tốt: 0 mg/L
            2.Ô nhiễm nhẹ: từ 0.01 đến dưới 1 mg/L
            3.Ô nhiễm trung bình: từ 1 đến dưới 10 mg/L
            4.Ô nhiễm nặng: từ 10 đến dưới 100 mg/L
            5.Ô nhiễm rất nặng: từ 100 mg/L
*/
          if (water.Oil = 0) {
            res11 = 1
          }else if(water.Oil < 1) {
            res11 = 2
          }else if(water.Oil < 10) {
            res11 = 3
          }else if(water.Oil < 100) {
            res11 = 4
          }else if(water.Oil >= 100) {
            res11 = 5 }  


        res.push(res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11)

        const maxNum = Math.max(...res);
        
        return maxNum

      }catch (error) {
        console.error(error);
          throw new Error("Error in result function");
      }
}, 
};


module.exports = resultWater;