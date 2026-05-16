const express = require("express");
const router = express.Router();
const {
  // loginPage,  // we use index.js  add this path 
  loginUser,
  logoutUser,
} = require("../controllers/authController");


// router.get("/login", loginPage);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;



