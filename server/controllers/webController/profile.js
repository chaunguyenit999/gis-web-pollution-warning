/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const profileRender = {
  // GET PROFILE EDIT PAGE
  getProfilePage: async (req, res) => {
    const current_user = req.currentUser;
    const locals = {
      breadcrumb: [
        {
          tag: "Cấu hình",
          link: "#",
        },
        {
          tag: "Tài khoản",
          link: "/admin/config/profile",
        },
      ],
      title: "Admin | Tài khoản",
      // page_required: false,
      page_required: {
        css_path: "config/profile/_css",
        script_path: "config/profile/_script",
      },
      description,
    };
    return res.render("pages/config/profile/profile.ejs", {
      locals,
      layout: "layouts/main",
      data: {
        current_user,
      },
    });
  },

  updateProfile: async (req, res) => {
    
  }
};

module.exports = profileRender;
