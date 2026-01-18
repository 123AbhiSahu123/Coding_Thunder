const express = require("express");
const router = express.Router();
const {
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.get("/login", loginPage);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
