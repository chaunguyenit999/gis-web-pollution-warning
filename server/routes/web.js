const router = require("express").Router();
const pageRender = require("../controllers/webController/render");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNT ROUTES
   */
  router.get("/login", pageRender.getLoginPage);
  /**
   * @description DASHBOARD ROUTES
   */
  router.get("/home", pageRender.getHomePage);
  router.get("/dashboard-alert", pageRender.getAlertPage);
  router.get("/dashboard-message", pageRender.getMessagePage);
  /**
   * @description MANAGEMENT ROUTES
   */
  router.get("/mgmt-env-data", pageRender.getEnvDataMgmtPage);
  router.get("/mgmt-users", pageRender.getUsersPage);
  router.get("/mgmt-posts", pageRender.getPostsPage);
  router.get("/mgmt-files", pageRender.getFilesPage);
  /**
   * @description CONFIG ROUTES
   */
  router.get("/config-profile", pageRender.getProfilePage);
  /**
   * @description SUPPORT ROUTES
   */

  return app.use("/admin", router);
};

module.exports = initAPIRoute;
