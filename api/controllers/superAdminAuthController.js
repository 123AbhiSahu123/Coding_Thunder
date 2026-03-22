const bcrypt = require("bcrypt");

exports.superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.SUPERADMIN_EMAIL) {
      return res.render("superadmin/adminlogin", {
        error: "Invalid email"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      process.env.SUPERADMIN_PASSWORD_HASH
    );

    if (!isMatch) {
      return res.render("superadmin/adminlogin", {
        error: "Invalid password"
      });
    }

    req.session.superadmin = true;

    res.redirect("/superadmin/dashboard");
  } catch (err) {
    console.log(err);
    res.send("SuperAdmin login error");
  }
};









