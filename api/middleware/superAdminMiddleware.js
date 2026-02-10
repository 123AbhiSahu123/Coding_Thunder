module.exports = (req, res, next) => {
  if (req.session && req.session.superadmin) {
    next();
  } else {
    res.redirect("/superadmin/login");
  }
};





