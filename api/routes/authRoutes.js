const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // database se user nikalna
  const user = await User.findOne({ email, password }).lean();

  if (!user) {
    return res.send("Email or Password wrong ❌");
  }

  // login ke baad dashboard par bhejo
  res.render("dashboard", { user });
});


router.get("/login", loginPage);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   loginPage,
//   loginUser,
//   logoutUser,
// } = require("../controllers/authController");

// router.get("/login", loginPage);
// router.post("/login", loginUser);
// router.get("/logout", logoutUser);

// module.exports = router;
