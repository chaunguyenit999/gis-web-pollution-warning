const Air = require("../../models/AirModel");

const pageRender = {
  // GET HOME PAGE
  getHomePage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Bảng điều khiển",
          link: "/",
        },
        {
          tag: "Trang chủ",
          link: "/",
        },
      ],
      title: "Admin | Trang chủ",
      description: "Gis Web Management",
    };
    return res.render("pages/index.ejs", {
      locals,
      layout: "layouts/main",
    });
  }


}

module.exports = pageRender;
