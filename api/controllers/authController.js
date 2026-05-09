const User = require("../models/User"); // agar User model hai


// Login logic page
// exports.loginPage = (req, res) => {
//   res.render("login");  // ya res.send("Login Page")
// };

exports.loginUser = async(req, res) => {
  const { email, password } =req.body;
  const user = await User.findOne({ email}).lean();

  if (!user || user.password !== password) {
    return res.send("❌ Invalid Email or Password");
  }

  req.session.user = user;
  res.redirect("/dashboard");
};


// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

// authController.js (jahan signup handle ho raha hai)
exports.postSignup = async (req, res) => {
    const { name, email, password } = req.body;
    const sessionPass = req.session.generatedPassword;

    // Check ki kya user ne wahi password dala hai jo humne diya tha
    if (password !== sessionPass) {
        return res.send("<script>alert('Invalid Password! Please use the generated password.'); window.location.href='/checkout';</script>");
    }

    // Agar sahi hai toh database mein save karein
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        req.session.generatedPassword = null; // Use hone ke baad delete kar dein
        res.redirect('/login');
    } catch (err) {
        res.send("Error: " + err.message);
    }
};



















