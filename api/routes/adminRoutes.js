const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isSuperAdmin = require("../middleware/superAdminMiddleware");

router.get("/dashboard", adminController.adminDashboard);

router.get("/dashboard", isSuperAdmin, async (req, res) => {
    // yahan tum MongoDB Atlas ka saara data fetch kar sakte ho
    res.render("admin/dashboard");
});

module.exports = router;










// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");

// router.get("/dashboard", adminController.adminDashboard);

// module.exports = router;



