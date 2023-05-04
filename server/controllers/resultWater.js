const Water = require("../models/WaterModel");

const resultWater = {
    result: async (id) => {
        try {
          const res = [];
          const water = await Water.findById(id);
          let res1, res2, res3, res4, res5, res6, res7, res8, res9, res10
          //BOD5
          /*
            1.Nước tốt: dưới 4 mg/L
            2.Ô nhiễm nhẹ: từ 4 đến dưới 6 mg/L
            3.Ô nhiễm trung bình: từ 6 đến dưới 20 mg/L
            4.Ô nhiễm nặng: từ 20 mg/L
*/
          if (water.BOD5 < 4) {
            res1 = 1
          }else if( water.BOD5 < 6) {
            res1 = 2
          }else if(water.BOD5 < 20) {
            res1 = 3
          }else if( water.BOD5 >= 20) {
            res1 = 4 }
     
          //COD
          /*
            1.Nước tốt: dưới 10 mg/L
            2.Ô nhiễm nhẹ: từ 10 đến dưới 15 mg/L
            3.Ô nhiễm trung bình: từ 15 đến dưới 40 mg/L
            4.Ô nhiễm nặng: từ 40 mg/L
*/
          if (water.COD < 10) {
            res2 = 1
          }else if(water.COD < 15) {
            res2 = 2
          }else if(water.COD < 40) {
            res2 = 3
          }else if( water.COD >= 40) {
            res2 = 4 }
      
          //DO
          /*
            1.Nước tốt: từ 5 mg/L
            2.Ô nhiễm nhẹ: từ 4 đến dưới 5 mg/L
            3.Ô nhiễm trung bình: từ 2 đến dưới 4 mg/L
            4.Ô nhiễm nặng: dưới 2 mg/L
*/
          if (water.DO >= 5) {
            res3 = 1
          }else if(water.DO >= 4) {
            res3 = 2
          }else if(water.DO >= 2) {
            res3 = 3
          }else if(water.DO < 2) {
            res3 = 4 }
 
          //SS
          /*
            1.Nước tốt: dưới 15 mg/L
            2.Ô nhiễm nhẹ: từ 15 đến dưới 20 mg/L
            3.Ô nhiễm trung bình: từ 20 đến dưới 30 mg/L
            4.Ô nhiễm nặng: từ 30 mg/L
*/
          if ( water.SS < 15) {
            res4 = 1
          }else if(water.SS < 20) {
            res4 = 2
          }else if(water.SS < 30) {
            res4 = 3
          }else if(water.SS >= 30) {
            res4 = 4 }

          //EC
          /*
            1.Nước tốt: dưới 200 µS/m
            2.Ô nhiễm nhẹ: từ 250 đến dưới 300 µS/m
            3.Ô nhiễm trung bình: từ 300 đến dưới 400 µS/m
            4.Ô nhiễm nặng: từ 400 µS/m
*/
          if (water.EC < 200) {
            res5 = 1
          }else if(water.EC < 300) {
            res5 = 2
          }else if(water.EC < 400) {
            res5 = 3
          }else if(water.EC >= 400) {
            res5 = 4 }

          //TDS
          /*
            1.Nước tốt: dưới 100 mg/L
            2.Ô nhiễm nhẹ: từ 100 đến dưới 150 mg/L
            3.Ô nhiễm trung bình: từ 150 đến dưới 250 mg/L
            4.Ô nhiễm nặng: từ 250 mg/L
*/
          if (water.TDS < 100) {
            res6 = 1
          }else if(water.TDS < 150) {
            res6 = 2
          }else if(water.TDS < 250) {
            res6 = 3
          }else if(water.TDS >= 250) {
            res6 = 4 }

          //NO2-
          /*
            1.Nước tốt: dưới 0,01 mg/L
            2.Ô nhiễm nhẹ: từ 0,01 đến dưới 0,03 mg/L
            3.Ô nhiễm trung bình: từ 0,03 đến dưới 0,05 mg/L
            4.Ô nhiễm nặng: từ 0.05 mg/L
*/
          if (water.NO2 < 0.01) {
            res7 = 1
          }else if(water.NO2 < 0.03) {
            res7 = 2
          }else if(water.NO2 < 0.05) {
            res7 = 3
          }else if(water.NO2 >= 0.05) {
            res7 = 4 }

          //NO3-
          /*
            1.Nước tốt: dưới 2 mg/L
            2.Ô nhiễm nhẹ: từ 2 đến dưới 10 mg/L
            3.Ô nhiễm trung bình: từ 10 đến dưới 15 mg/L
            4.Ô nhiễm nặng: từ 15 mg/L
*/
          if (water.NO3 < 2) {
            res8 = 1
          }else if(water.NO3 < 5) {
            res8 = 2
          }else if(water.NO3 < 10) {
            res8 = 3
          }else if(water.NO3 >= 15) {
            res8 = 4 }
            
          //NH4+
          /*
            1.Nước tốt: dưới 0.3 mg/L
            2.Ô nhiễm nhẹ: từ 0.3 đến dưới 0.5 mg/L
            3.Ô nhiễm trung bình: từ 0.5 đến dưới 0,9 mg/L
            4.Ô nhiễm nặng: từ 0,9 mg/L
*/
          if (water.NH4 < 0.3) {
            res9 = 1
          }else if(water.NH4 < 0.5) {
            res9 = 2
          }else if(water.NH4 < 0.9) {
            res9 = 3
          }else if(water.NH4 >= 0.9) {
            res9 = 4 } 
            
                      
          //P3O4-
          /*
            1.Nước tốt: dưới 0.2 mg/L
            2.Ô nhiễm nhẹ: từ 0.2 đến dưới 0.3 mg/L
            3.Ô nhiễm trung bình: từ 0.3 đến dưới 0.5 mg/L
            4.Ô nhiễm nặng: từ 0.5 mg/L
*/
          if (water.P3O4 < 0.2) {
            res10 = 1
          }else if(water.P3O4 < 0.3) {
            res10 = 2
          }else if(water.P3O4 < 0.5) {
            res10 = 3
          }else if( water.P3O4 >= 0.5) {
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


module.exports = resultWater;