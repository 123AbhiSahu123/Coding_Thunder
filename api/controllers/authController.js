const User = require("../models/User"); // agar User model hai


// Login page
exports.loginPage = (req, res) => {
  res.render("login"); // ya res.send("Login Page")
};

// Login logic
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.send("❌ Invalid Email or Password");
  }

  if (user.role !== "admin") {
    return res.send("❌ Access denied. Admin only.");
  }

  req.session.user = {
    id: user._id,
    role: user.role,
  };

  res.redirect("/admin/dashboard");
};

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};





















