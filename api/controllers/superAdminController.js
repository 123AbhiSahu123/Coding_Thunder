exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    // env values
    const adminEmail = process.env.SUPERADMIN_EMAIL;
    const adminPassword = process.env.SUPERADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.render("superadmin/login", {
        error: "Invalid email or password"
      });
    }

    // session set
    req.session.superAdmin = {
      email: adminEmail
    };

    res.redirect("/superadmin/dashboard");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.dashboard = (req, res) => {
  res.render("superadmin/dashboard", {
    superAdmin: req.session.superAdmin
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/superadmin/login");
  });
};






