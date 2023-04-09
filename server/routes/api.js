const router = require("express").Router();
const airController = require("../controllers/air");
const waterController = require("../controllers/water");

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

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;