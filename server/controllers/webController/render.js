const description = "Gis Web Management";

const pageRender = {
  // GET HOME PAGE
  getLoginPage: async (req, res) => {
    const locals = {
      title: "Admin | Đăng nhập",
      description,
    };
    return res.render("pages/login.ejs", {
      locals,
      layout: false,
    });
  },

  // GET HOME PAGE
  getHomePage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Bảng điều khiển",
          link: "/admin/home",
        },
        {
          tag: "Trang chủ",
          link: "#",
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

  // GET ALERT PAGE
  getAlertPage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Bảng điều khiển",
          link: "/admin/home",
        },
        {
          tag: "Thông báo",
          link: "#",
        },
      ],
      title: "Admin | Thông báo",
      page_resource: "dashboard-alert",
      description,
    };
    return res.render("pages/dashboard-alert.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  // GET MESSAGE PAGE
  getMessagePage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Bảng điều khiển",
          link: "/admin/home",
        },
        {
          tag: "Tin nhắn",
          link: "#",
        },
      ],
      title: "Admin | Tin nhắn",
      page_resource: "dashboard-message",
      description,
    };
    return res.render("pages/dashboard-message.ejs", {
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
          link: "/admin/home",
        },
        {
          tag: "Dữ liệu môi trường",
          link: "#",
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

  getUsersPage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Dữ liệu môi trường",
          link: "#",
        },
      ],
      title: "Admin | Thành viên",
      page_resource: "mgmt-env_data",
      description,
    };
    return res.render("pages/mgmt-users.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  getPostsPage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Bài viết",
          link: "#",
        },
      ],
      title: "Admin | Bài viết",
      page_resource: "",
      description,
    };
    return res.render("pages/mgmt-posts.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  getFilesPage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Bài viết",
          link: "#",
        },
      ],
      title: "Admin | Tệp tin",
      page_resource: "mgmt-files",
      description,
    };
    return res.render("pages/mgmt-files.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  // GET PROFILE EDIT PAGE
  getProfilePage: async (req, res) => {
    const locals = {
      directories: [
        {
          tag: "Cấu hình",
          link: "/admin/home",
        },
        {
          tag: "Tài khoản",
          link: "#",
        },
      ],
      title: "Admin | Profile",
      page_resource: "",
      description,
    };
    return res.render("pages/config-profile.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = pageRender;
