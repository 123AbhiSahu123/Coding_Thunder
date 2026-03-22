module.exports = (req, res, next) => {
  if (req.session && req.session.superAdmin) {
    next();
  } else {
    res.redirect("/superadmin/login");
  }
};
