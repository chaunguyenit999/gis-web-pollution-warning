const router = require("express").Router();
const pageRender = require("../controllers/webController/render");

const initAPIRoute = (app) => {
  /**
   * @description DASHBOARD ROUTES
   */
  router.get("/", pageRender.getHomePage);
  /**
   * @description MANAGEMENT ROUTES
   */
  router.get("/mgmt-env-data", pageRender.getEnvDataMgmtPage);
  /**
   * @description CONFIG ROUTES
   */

  /**
   * @description SUPPORT ROUTES
   */

  return app.use("/", router);
};

module.exports = initAPIRoute;
