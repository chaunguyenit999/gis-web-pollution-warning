const router = require("express").Router();
const airController = require("../controllers/APIcontroller/air");
const waterController = require("../controllers/APIcontroller/water");
const soilController = require("../controllers/APIcontroller/soil");

const initAPIRoute = (app) => {
  /**
   * @description AIR ROUTES
   */
  router.post("/airs", airController.addAirInfo);
  router.get("/airs", airController.getAllAirInfor);
  router.get("/airs/:id", airController.getAirInforById);
  router.put("/airs/:id", airController.updateAirInforById);
  router.delete("/airs/:id", airController.deleteAirInforById);

  /**
   * @description WATER ROUTES
   */
  router.post("/waters", waterController.addWaterInfo);
  router.get("/waters", waterController.getAllWaterInfor);
  router.get("/waters/:id", waterController.getWaterInforById);
  router.put("/waters/:id", waterController.updateWaterInforById);
  router.delete("/waters/:id", waterController.deleteWaterInforById);

  /**
   * @description SOIL ROUTES
   */
  router.post("/soils", soilController.addSoilInfo);
  router.get("/soils", soilController.getAllSoilInfor);
  router.get("/soils/:id", soilController.getSoilInforById);
  router.put("/soils/:id", soilController.updateSoilInforById);
  router.delete("/soils/:id", soilController.deleteSoilInforById);

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;
