/**
 * @description
 * css_path and script_path start from "pages" folder
 */

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
      breadcrumb: [
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
      page_required: {
        css_path: "dashboard/home/_css",
        script_path: "dashboard/home/_script",
      },
      description,
    };
    return res.render("pages/dashboard/home/home.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  // GET NOTIFICATION PAGE
  getNotiPage: async (req, res) => {
    const locals = {
      breadcrumb: [
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
      page_required: {
        css_path: "dashboard/notification/_css",
        script_path: "dashboard/notification/_script",
      },
      description,
    };
    return res.render("pages/dashboard/notification/notification.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  // GET MESSAGE PAGE
  getMessPage: async (req, res) => {
    const locals = {
      breadcrumb: [
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
      page_required: {
        css_path: "dashboard/message/_css",
        script_path: "dashboard/message/_script",
      },
      description,
    };
    return res.render("pages/dashboard/message/message.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

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
        css_path: "management/env_data/_css",
        script_path: "management/env_data/_script",
      },
      description,
    };
    return res.render("pages/management/env_data/stations/air.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  getUsersPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Thành viên",
          link: "#",
        },
      ],
      title: "Admin | Thành viên",
      page_required: {
        css_path: "management/users/_css",
        script_path: "management/users/_script",
      },
      description,
    };
    return res.render("pages/management/users/users.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  getPostsPage: async (req, res) => {
    const locals = {
      breadcrumb: [
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
      page_required: false,
      description,
    };
    return res.render("pages/management/posts/posts.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  getFilesPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Tệp tin",
          link: "#",
        },
      ],
      title: "Admin | Tệp tin",
      page_required: false,
      description,
    };
    return res.render("pages/management/files/files.ejs", {
      locals,
      layout: "layouts/main",
    });
  },

  // GET PROFILE EDIT PAGE
  getProfilePage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Cấu hình",
          link: "/admin/home",
        },
        {
          tag: "Tài khoản",
          link: "#",
        },
      ],
      title: "Admin | Tài khoản",
      page_required: false,
      description,
    };
    return res.render("pages/config/profile/profile.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = pageRender;
