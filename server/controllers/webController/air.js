const axios = require("axios");

const airRender = {
  // GET ENVIRONMENT DATA MANAGEMENT PAGE
  getAirPage: async (req, res) => {
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
          tag: "Dữ liệu không khí",
          link: "/admin/management/env-data/stations/air",
        },
      ],
      title: "Admin | Dữ liệu không khí",
      page_required: {
        // css_path and script_path start from "pages" folder
        css_path: "management/env_data/stations/air/_css",
        script_path: "management/env_data/stations/air/_script",
      },
      description: "Gis Web Management",
    };

    // Make a get request to get all air infor
    axios
      .get("http://localhost:8080/api/v1/airs")
      .then(function (response) {
        return res.render("pages/management/env_data/stations/air/air.ejs", {
          locals,
          air_infor: response.data,
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

module.exports = airRender;
