const router = require("express").Router();
const pageRender = require("../controllers/webController/render");

const initAPIRoute = (app) => {
  /**
   * @description HOME ROUTES
   * 
   */
  router.get("/", pageRender.getHomePage);
  /**
   * @description WATER ROUTES
   */

  /**
   * @description SOIL ROUTES
   */

  return app.use("/", router);
};

module.exports = initAPIRoute;
