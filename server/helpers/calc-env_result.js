const calcResult = {
  air: (cal_data) => {
    let wind_dust_val = cal_data.wind_dust;
    let sulfur_dioxide_val = cal_data.sulfur_dioxide;
    let nito_dioxit_val = cal_data.nito_dioxit;

    let wind_dust_result, sulfur_dioxide_result, nito_dioxit_result;
    /**
    @description (BỤI MỊN)
    1.Tốt: dưới 200 µg/m³
    2.Hơi tốt: từ 200 đến 300 µg/m³
    3.Trung bình: từ 300 đến 400 µg/m³
    4.Kém: từ 400 µg/m³
    */
    if (wind_dust_val < 200) {
      wind_dust_result = 1;
    } else if (wind_dust_val < 300) {
      wind_dust_result = 2;
    } else if (wind_dust_val < 400) {
      wind_dust_result = 3;
    } else {
      wind_dust_result = 4;
    }

    /**
    @description (SULFUR)
    1.Cấp độ tốt: Lượng SO2 trong không khí là từ 0 đến 30 microgram/m3.
    2.Cấp độ trung bình: Lượng SO2 trong không khí là từ 30 đến 70 microgram/m3.
    3.Cấp độ không tốt cho sức khỏe: Lượng SO2 trong không khí là từ 70 đến 180 microgram/m3.
    4.Cấp độ nguy hại cho sức khỏe: Lượng SO2 trong không khí là từ 180 đến 300 microgram/m3.
    */
    if (sulfur_dioxide_val < 50) {
      sulfur_dioxide_result = 1;
    } else if (sulfur_dioxide_val < 70) {
      sulfur_dioxide_result = 2;
    } else if (sulfur_dioxide_val < 100) {
      sulfur_dioxide_result = 3;
    } else {
      sulfur_dioxide_result = 4;
    }

    /**
    @description (NITO)
    1.Tốt nhất: nồng độ PM2.5 dưới 35 µg/m³
    2.Tốt: nồng độ PM2.5 từ 10 đến 50 µg/m³
    3.Trung bình: nồng độ PM2.5 từ 80 đến 50 µg/m³
    4.Kém: nồng độ PM2.5 lớn hơn 80 µg/m³
    */
    if (nito_dioxit_val < 35) {
      nito_dioxit_result = 1;
    } else if (nito_dioxit_val < 50) {
      nito_dioxit_result = 2;
    } else if (nito_dioxit_val < 80) {
      nito_dioxit_result = 3;
    } else {
      nito_dioxit_result = 4;
    }

    let result = Math.max(
      wind_dust_result,
      sulfur_dioxide_result,
      nito_dioxit_result
    );

    return result;
  },

  soil: (cal_data) => {
    let exchange_acidity_val = cal_data.exchange_acidity;
    let total_nitrogen_val = cal_data.total_nitrogen;
    let total_photpho_val = cal_data.total_photpho;
    let total_kali_val = cal_data.total_kali;
    let calci_val = cal_data.calci;
    let magie_val = cal_data.magie;
    let zinc_val = cal_data.zinc;
    let plumbum_val = cal_data.plumbum;
    let copper_val = cal_data.copper;
    let arsenic_val = cal_data.arsenic;

    let exchange_acidity_result,
      total_nitrogen_result,
      total_photpho_result,
      total_kali_result,
      calci_result,
      magie_result,
      zinc_result,
      plumbum_result,
      copper_result,
      arsenic_result;
    /**
    @description (pHKCL)
    1.Đất tốt: từ trên 6.5 
    2.Ô nhiễm nhẹ: từ trên 5.5 đến 6.5
    3.Ô nhiễm trung bình: từ trên 4.5 đến 5.5
    4.Ô nhiễm nặng: từ 4.5 xuống
    */
    if (exchange_acidity_val > 6.5) {
      exchange_acidity_result = 1;
    } else if (exchange_acidity_val > 5.5) {
      exchange_acidity_result = 2;
    } else if (exchange_acidity_val > 4.5) {
      exchange_acidity_result = 3;
    } else {
      exchange_acidity_result = 4;
    }

    /**
    @description (N2 TỔNG SỐ)
    1.Đất tốt: dưới 0.2%
    2.Ô nhiễm nhẹ: từ 0.2% đến dưới 0.3%
    3.Ô nhiễm trung bình: từ 0.3% đến dưới 0.4%
    4.Ô nhiễm nặng: từ 0.4% 
    */
    if (total_nitrogen_val < 0.2) {
      total_nitrogen_result = 1;
    } else if (total_nitrogen_val < 0.3) {
      total_nitrogen_result = 2;
    } else if (total_nitrogen_val < 0.4) {
      total_nitrogen_result = 3;
    } else {
      total_nitrogen_result = 4;
    }

    /**
    @description (P TỔNG SỐ)
    1.Đất tốt: dưới 0.05%
    2.Ô nhiễm nhẹ: từ 0.05% đến dưới 0.1%
    3.Ô nhiễm trung bình: từ 0.1% đến dưới 0.15%
    4.Ô nhiễm nặng: từ 0.15% 
    */
    if (total_photpho_val < 0.05) {
      total_photpho_result = 1;
    } else if (total_photpho_val < 0.1) {
      total_photpho_result = 2;
    } else if (total_photpho_val < 0.15) {
      total_photpho_result = 3;
    } else {
      total_photpho_result = 4;
    }

    /**
    @description (K TỔNG SỐ)
    1.Đất tốt: dưới 0.1%
    2.Ô nhiễm nhẹ: từ 0.2% đến dưới 0.2%
    3.Ô nhiễm trung bình: từ 0.2% đến dưới 0.4%
    4.Ô nhiễm nặng: từ 0.4%
    */
    if (total_kali_val < 0.1) {
      total_kali_result = 1;
    } else if (total_kali_val < 0.2) {
      total_kali_result = 2;
    } else if (total_kali_val < 0.4) {
      total_kali_result = 3;
    } else {
      total_kali_result = 4;
    }

    /**
    @description (Ca2+)
    1.Đất tốt: dưới 5000 mg/kg
    2.Ô nhiễm nhẹ: từ 5000 đến dưới 7000 mg/kg
    3.Ô nhiễm trung bình: từ 7000 đến dưới 10000 mg/kg
    4.Ô nhiễm nặng: từ 10000 mg/kg
    */
    if (calci_val < 5000) {
      calci_result = 1;
    } else if (calci_val < 7000) {
      calci_result = 2;
    } else if (calci_val < 10000) {
      calci_result = 3;
    } else {
      calci_result = 4;
    }

    /**
    @description (Mg2+)
    1.Đất tốt: dưới 500 mg/kg
    2.Ô nhiễm nhẹ: từ 500 đến dưới 700 mg/kg
    3.Ô nhiễm trung bình: từ 700 đến dưới 1000 mg/kg
    4.Ô nhiễm nặng: từ 1000 mg/kg
    */
    if (magie_val < 500) {
      magie_result = 1;
    } else if (magie_val < 700) {
      magie_result = 2;
    } else if (magie_val < 1000) {
      magie_result = 3;
    } else {
      magie_result = 4;
    }

    /**
    @description (Zn)
    1.Đất tốt: dưới 50 mg/kg
    2.Ô nhiễm nhẹ: từ 50 đến dưới 70 mg/kg
    3.Ô nhiễm trung bình: từ 70 đến dưới 100 mg/kg
    4.Ô nhiễm nặng: từ 100 mg/kg
    */
    if (zinc_val < 50) {
      zinc_result = 1;
    } else if (zinc_val < 70) {
      zinc_result = 2;
    } else if (zinc_val < 100) {
      zinc_result = 3;
    } else {
      zinc_result = 4;
    }

    /**
    @description (Pb)
    1.Đất tốt: dưới 20 mg/kg
    2.Ô nhiễm nhẹ: từ 20 đến dưới 40 mmg/kg
    3.Ô nhiễm trung bình: từ 40 đến dưới 70 mg/kg
    4.Ô nhiễm nặng: từ 70 mg/kg
    */
    if (plumbum_val < 20) {
      plumbum_result = 1;
    } else if (plumbum_val < 40) {
      plumbum_result = 2;
    } else if (plumbum_val < 70) {
      plumbum_result = 3;
    } else {
      plumbum_result = 4;
    }

    /**
    @description (Cu)
    1.Đất tốt: dưới 30 mg/kg
    2.Ô nhiễm nhẹ: từ 30 đến dưới 50 mg/kg
    3.Ô nhiễm trung bình: từ 50 đến dưới 80 mg/kg
    4.Ô nhiễm nặng: từ 80 mg/kg
    */
    if (copper_val < 30) {
      copper_result = 1;
    } else if (copper_val < 50) {
      copper_result = 2;
    } else if (copper_val < 80) {
      copper_result = 3;
    } else {
      copper_result = 4;
    }

    /**
    @description (As)
    1.Đất tốt: dưới 5 mg/kg
    2.Ô nhiễm nhẹ: từ 5 đến dưới 7 mmg/kg
    3.Ô nhiễm trung bình: từ 7 đến dưới 9 mg/kg
    4.Ô nhiễm nặng: từ 9 mg/kg
    */
    if (arsenic_val < 5) {
      arsenic_result = 1;
    } else if (arsenic_val < 7) {
      arsenic_result = 2;
    } else if (arsenic_val < 9) {
      arsenic_result = 3;
    } else {
      arsenic_result = 4;
    }

    let result = Math.max(
      total_nitrogen_result,
      total_photpho_result,
      total_kali_result,
      calci_result,
      magie_result,
      zinc_result,
      plumbum_result,
      copper_result,
      arsenic_result
    );

    return result;
  },

  water: (cal_data) => {
    let pH_val = cal_data.pH;
    let BOD5_val = cal_data.BOD5;
    let COD_val = cal_data.COD;
    let DO_val = cal_data.DO;
    let SS_val = cal_data.SS;
    let EC_val = cal_data.EC;
    let TDS_val = cal_data.TDS;
    let NO2_val = cal_data.NO2;
    let NO3_val = cal_data.NO3;
    let NH4_val = cal_data.NH4;
    let P3O4_val = cal_data.P3O4;

    let pH_result,
      BOD5_result,
      COD_result,
      DO_result,
      SS_result,
      EC_result,
      TDS_result,
      NO2_result,
      NO3_result,
      NH4_result,
      P3O4_result;

    /**
    @description (pH)
    1.Nước tốt: 7.1 đến 7.6
    2.Ô nhiễm nhẹ: từ 6 đến 7.1 và 7.6 đến 9
    3.Ô nhiễm trung bình: từ 5 đến 6 và 9 đến 10
    4.Ô nhiễm nặng: nhỏ hơn 5 hoặc lớn hơn 10
    */
    if (pH_val >= 7.1 && pH_val <= 7.6) {
      pH_result = 1;
    } else if ((pH_val >= 6 && pH_val < 7.1) || (pH_val > 7.6 && pH_val <= 9)) {
      pH_result = 2;
    } else if ((pH_val >= 5 && pH_val < 6) || (pH_val > 9 && pH_val <= 10)) {
      pH_result = 3;
    } else {
      pH_result = 4;
    }

    /**
    @description (BOD5)
    1.Nước tốt: dưới 4 mg/L
    2.Ô nhiễm nhẹ: từ 4 đến dưới 6 mg/L
    3.Ô nhiễm trung bình: từ 6 đến dưới 20 mg/L
    4.Ô nhiễm nặng: từ 20 mg/L
    */
    if (BOD5_val < 4) {
      BOD5_result = 1;
    } else if (BOD5_val < 6) {
      BOD5_result = 2;
    } else if (BOD5_val < 20) {
      BOD5_result = 3;
    } else {
      BOD5_result = 4;
    }

    /**
    @description (COD)
    1.Nước tốt: dưới 10 mg/L
    2.Ô nhiễm nhẹ: từ 10 đến dưới 15 mg/L
    3.Ô nhiễm trung bình: từ 15 đến dưới 40 mg/L
    4.Ô nhiễm nặng: từ 40 mg/L
    */
    if (COD_val < 10) {
      COD_result = 1;
    } else if (COD_val < 15) {
      COD_result = 2;
    } else if (COD_val < 40) {
      COD_result = 3;
    } else {
      COD_result = 4;
    }

    /**
    @description (DO)
    1.Nước tốt: từ 5 mg/L
    2.Ô nhiễm nhẹ: từ 4 đến dưới 5 mg/L
    3.Ô nhiễm trung bình: từ 2 đến dưới 4 mg/L
    4.Ô nhiễm nặng: dưới 2 mg/L
    */
    if (DO_val >= 5) {
      DO_result = 1;
    } else if (DO_val >= 4) {
      DO_result = 2;
    } else if (DO_val >= 2) {
      DO_result = 3;
    } else {
      DO_result = 4;
    }

    /**
    @description (SS)
    1.Nước tốt: dưới 15 mg/L
    2.Ô nhiễm nhẹ: từ 15 đến dưới 20 mg/L
    3.Ô nhiễm trung bình: từ 20 đến dưới 30 mg/L
    4.Ô nhiễm nặng: từ 30 mg/L
    */
    if (SS_val < 15) {
      SS_result = 1;
    } else if (SS_val < 20) {
      SS_result = 2;
    } else if (SS_val < 30) {
      SS_result = 3;
    } else {
      SS_result = 4;
    }

    /**
    @description (EC)
    1.Nước tốt: dưới 200 µS/m
    2.Ô nhiễm nhẹ: từ 250 đến dưới 300 µS/m
    3.Ô nhiễm trung bình: từ 300 đến dưới 400 µS/m
    4.Ô nhiễm nặng: từ 400 µS/m
    */
    if (EC_val < 200) {
      EC_result = 1;
    } else if (EC_val < 300) {
      EC_result = 2;
    } else if (EC_val < 400) {
      EC_result = 3;
    } else {
      EC_result = 4;
    }

    /**
    @description (TDS)
    1.Nước tốt: dưới 100 mg/L
    2.Ô nhiễm nhẹ: từ 100 đến dưới 150 mg/L
    3.Ô nhiễm trung bình: từ 150 đến dưới 250 mg/L
    4.Ô nhiễm nặng: từ 250 mg/L
    */
    if (TDS_val < 100) {
      TDS_result = 1;
    } else if (TDS_val < 150) {
      TDS_result = 2;
    } else if (TDS_val < 250) {
      TDS_result = 3;
    } else {
      TDS_result = 4;
    }

    /**
    @description (NO2)
    1.Nước tốt: dưới 0,01 mg/L
    2.Ô nhiễm nhẹ: từ 0,01 đến dưới 0,03 mg/L
    3.Ô nhiễm trung bình: từ 0,03 đến dưới 0,05 mg/L
    4.Ô nhiễm nặng: từ 0.05 mg/L
    */
    if (NO2_val < 0.01) {
      NO2_result = 1;
    } else if (NO2_val < 0.03) {
      NO2_result = 2;
    } else if (NO2_val < 0.05) {
      NO2_result = 3;
    } else {
      NO2_result = 4;
    }

    /**
    @description (NO3)
    1.Nước tốt: dưới 2 mg/L
    2.Ô nhiễm nhẹ: từ 2 đến dưới 10 mg/L
    3.Ô nhiễm trung bình: từ 10 đến dưới 15 mg/L
    4.Ô nhiễm nặng: từ 15 mg/L
    */
    if (NO3_val < 2) {
      NO3_result = 1;
    } else if (NO3_val < 10) {
      NO3_result = 2;
    } else if (NO3_val < 15) {
      NO3_result = 3;
    } else {
      NO3_result = 4;
    }

    /**
    @description (NH4)
    1.Nước tốt: dưới 0.3 mg/L
    2.Ô nhiễm nhẹ: từ 0.3 đến dưới 0.5 mg/L
    3.Ô nhiễm trung bình: từ 0.5 đến dưới 0,9 mg/L
    4.Ô nhiễm nặng: từ 0,9 mg/L
    */
    if (NH4_val < 0.3) {
      NH4_result = 1;
    } else if (NH4_val < 0.5) {
      NH4_result = 2;
    } else if (NH4_val < 0.9) {
      NH4_result = 3;
    } else {
      NH4_result = 4;
    }

    /**
    @description (P3O4)
    1.Nước tốt: dưới 0.2 mg/L
    2.Ô nhiễm nhẹ: từ 0.2 đến dưới 0.3 mg/L
    3.Ô nhiễm trung bình: từ 0.3 đến dưới 0.5 mg/L
    4.Ô nhiễm nặng: từ 0.5 mg/L
    */
    if (P3O4_val < 0.2) {
      P3O4_result = 1;
    } else if (P3O4_val < 0.3) {
      P3O4_result = 2;
    } else if (P3O4_val < 0.5) {
      P3O4_result = 3;
    } else {
      P3O4_result = 4;
    }

    let result = Math.max(
      pH_result,
      BOD5_result,
      COD_result,
      DO_result,
      SS_result,
      EC_result,
      TDS_result,
      NO2_result,
      NO3_result,
      NH4_result,
      P3O4_result
    );

    return result;
  },
};

module.exports = calcResult;
