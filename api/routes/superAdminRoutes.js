const express = require("express");
const router = express.Router();
const User = require('../models/User'); // Model import sahi hai
const controller = require("../controllers/superAdminController");
const superAdminAuth = require("../middleware/superAdminAuth");

// 1. Login Routes
router.get("/login", (req, res) => {
  res.render("superadmin/login");
});

router.post("/login", controller.login);

// 2. Dashboard Route (MERGED & FIXED)
// Dashboard route - sirf controller ko call karein
router.get("/dashboard", superAdminAuth, controller.dashboard);

// 3. Logout
router.get("/logout", controller.logout);

module.exports = router;
