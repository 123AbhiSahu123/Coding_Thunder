
module.exports = (req, res, next) => {
  console.log("Session:", req.session);

  if (req.session && req.session.superadmin) {
    next();
  } else {
    res.redirect("/superadmin/login");
  }
};


