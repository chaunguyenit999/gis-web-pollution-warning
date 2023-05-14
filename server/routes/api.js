const router = require("express").Router();
const airController = require("../controllers/APIcontroller/air");
const openweathermapController = require("../controllers/APIcontroller/openweathermap");
const deleteDuplicatates = require("../middlewares/deleteDuplicatates");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNTS
   */
  router.post("/register", airController.addAirInfo);
  // router.post("/login", authController.loginUser);
  // router.post("/logout", verifyToken, authController.logOut);

  /**
   * @description AIR STATIONS ROUTES
   */
  router.post("/stations/airs", airController.addAirInfo);
  router.post("/stations/airs/bulk", airController.addManyAirInfo);
  router.get("/stations/airs", airController.getAllAirInfor);
  router.get("/stations/airs/:id", airController.getAirInforById);
  router.put("/stations/airs/:id", airController.updateAirInforById);
  router.delete("/stations/airs/:id", airController.deleteAirInforById);

  /**
   * @description AIR OPEN WEATHER ROUTES
   */
  router.post(
    "/open-api/openweathermap/airs/",
    openweathermapController.addAir
  );
  router.get(
    "/open-api/openweathermap/airs/filter",
    openweathermapController.filterAirInfor
  );
  router.get(
    "/open-api/openweathermap/airs",
    openweathermapController.getAllAirInfor
  );
  /**
   * @description CLEAN TEMP DATA
   */
  router.delete(
    "/delete-duplicates/collection/air",
    deleteDuplicatates.airCollection
  );

  router.post("/test", airController.testAqi);

  return app.use("/api/v1", router);
};

module.exports = initAPIRoute;
