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
// Agar index.js mein '/superadmin' use kiya hai, toh yahan sirf '/dashboard' likhein
router.get("/dashboard", superAdminAuth, async (req, res) => {
  try {
    // Database se data fetch karein
    const users = await User.find({}).lean();

    // console.log("DATA FROM DB:", users); // Terminal mein check karein

    // Dashboard render karein
    res.render('superadmin/dashboard', {
      users: users,
      title: "Superadmin Dashboard"
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send("Server Error");
  }
});

// 3. Logout
router.get("/logout", controller.logout);

module.exports = router;
