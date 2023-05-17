/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const openweathermapStatsRender = {
  // GET HOME PAGE
  getStatsPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Bảng điều khiển",
          link: "#",
        },
        {
          tag: "Thống kê",
          link: "#",
        },
        {
          tag: "Open weather map",
          link: "/admin/dashboard/stats/open-api/openweathermap",
        },
      ],
      title: "Admin | Thống kê",
      page_required: {
        css_path: "dashboard/stats/open-api/_css",
        script_path: "dashboard/stats/open-api/_script",
      },
      description,
    };
    return res.render(
      "pages/dashboard/stats/open-api/stats_openweathermap.ejs",
      {
        locals,
        layout: "layouts/main",
      }
    );
  },
};

module.exports = openweathermapStatsRender;
