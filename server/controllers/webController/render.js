const Air = require("../../models/AirModel");

const pageRender = {
  // GET HOME PAGE
  getHomePage: async (req, res) => {
    const locals = {
      title: "Admin | Dashboard",
      description: "Gis Web Management",
    };
    return res.render("pages/index.ejs", {
      locals,
      layout: "layouts/main",
    });
  }


}

module.exports = pageRender;
