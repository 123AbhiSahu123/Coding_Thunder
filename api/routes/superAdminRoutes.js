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

// console.log("Controller functions:", controller);  // for debugging line to find error
router.post("/delete-user/:id", superAdminAuth, controller.deleteUser);
//edit form ke liye GET route
router.get("/edit-user/:id", superAdminAuth, controller.getEditUser);
// Data save karne ke liye (POST method)
router.post("/update-user/:id", superAdminAuth, controller.updateUser);

// 3. Logout
router.get("/logout", controller.logout);

module.exports = router;
