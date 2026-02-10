const express = require("express");
const router = express.Router();

const controller = require("../controllers/superAdminController");
const superAdminAuth = require("../middleware/superAdminAuth");

router.get("/login", (req, res) => {
  res.render("superadmin/login");
});

router.post("/login", controller.login);

router.get("/dashboard", superAdminAuth, controller.dashboard);

router.get("/logout", controller.logout);

module.exports = router;













// const express = require("express");
// const router = express.Router();

// // const {
// //   superAdminLogin
// // } = require("../controllers/superAdminAuthController");

// const superAdminAuth = require("../middleware/superAdminMiddleware");
// const SuperAdminController = require("../controllers/superAdminController");

// router.get("/login", (req, res) => {
//   res.render("superadmin/login");
// });

// router.post("/login", SuperAdminController.login);

// router.get(
//   "/dashboard",
//   superAdminAuth,
//   SuperAdminController.dashboard
// );

// module.exports = router;











// // routes/superAdminRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getAllCollections } = require("../controllers/superAdminController");

// router.get("/collections", getAllCollections);

// module.exports = router;
