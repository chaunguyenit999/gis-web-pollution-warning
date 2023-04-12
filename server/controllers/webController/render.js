const description = "Gis Web Management";

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
      page_resource: "dashboard-home",
      description,
    };
    return res.render("pages/dashboard-home.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
  // GET ENVIRONMENT DATA MANAGEMENT PAGE
  getEnvDataMgmtPage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Quản trị",
          link: "/",
        },
        {
          tag: "Dữ liệu môi trường",
          link: "/mgmt-env-data",
        },
      ],
      title: "Admin | Quản trị",
      page_resource: "mgmt-env_data",
      description,
    };
    return res.render("pages/mgmt-env_data.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = pageRender;
