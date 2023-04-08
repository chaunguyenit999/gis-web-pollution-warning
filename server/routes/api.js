const router = require("express").Router();
const airController = require('../controllers/air');

const initAPIRoute = (app) => {
  /**
   * @description AIR ROUTES
   */
  router.post("/airs", airController.addAirInfo);
  router.get("/airs", airController.getAllAirInfor);
  router.get("/airs/:id", airController.getAirInforById);
  router.put("/airs/:id", airController.updateAirInforById);
  router.delete("/airs/:id", airController.deleteAirInforById);

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;
