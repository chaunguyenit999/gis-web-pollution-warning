const axios = require("axios");

const soilRender = {
  // GET ENVIRONMENT DATA MANAGEMENT PAGE
  getSoilPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/dashboard/home",
        },
        {
          tag: "Dữ liệu môi trường",
          link: "#",
        },
        {
          tag: "Trạm quan trắc",
          link: "#",
        },
        {
          tag: "Dữ liệu đất",
          link: "/admin/management/env-data/stations/soil",
        },
      ],
      title: "Admin | Dữ liệu đất",
      page_required: {
        // css_path and script_path start from "pages" folder
        css_path: "management/env_data/stations/soil/_css",
        script_path: "management/env_data/stations/soil/_script",
      },
      description: "Gis Web Management",
    };

    // Make a get request to get all soil infor
    axios
      .get("http://localhost:8080/api/v1/soils")
      .then(function (response) {
        return res.render("pages/management/env_data/stations/soil/soil.ejs", {
          locals,
          soil_infor: response.data,
          layout: "layouts/main",
        });
      })
      .catch((err) => {
        return res.render("pages/500-error.ejs", {
          err_message: err,
        });
      });
  },
};

module.exports = soilRender;
