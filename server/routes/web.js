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
  router.get("/dashboard/home", pageRender.getHomePage);
  router.get("/dashboard/notification", pageRender.getNotiPage);
  router.get("/dashboard/message", pageRender.getMessPage);
  /**
   * @description MANAGEMENT ROUTES
   */
  // Air
  router.get("/management/env-data/stations/air", pageRender.getAirPage);
  router.get("/management/users", pageRender.getUsersPage);
  router.get("/management/posts", pageRender.getPostsPage);
  router.get("/management/files", pageRender.getFilesPage);
  /**
   * @description CONFIG ROUTES
   */
  router.get("/config/profile", pageRender.getProfilePage);
  /**
   * @description SUPPORT ROUTES
   */

  return app.use("/admin", router);
};

module.exports = initAPIRoute;
