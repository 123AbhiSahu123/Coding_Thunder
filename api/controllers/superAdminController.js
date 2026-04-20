// User model ko import karna zaroori hai
const User = require("../models/User");

// exports.login = (req, res) => {  // we also write this type but export don't write in bottom
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.SUPERADMIN_EMAIL;
    const adminPassword = process.env.SUPERADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.render("superadmin/login", {
        error: "Invalid email or password",
      });
    }

    req.session.superAdmin = { email: adminEmail };
    res.redirect("/superadmin/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// Dashboard Logic (Merged with Search)
const dashboard = async (req, res) => {
  try {

    // 2. Search Logic
    const { search } = req.query;
    let query = {};
    console.log("Searching for:", search);

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { course: { $regex: search, $options: "i" } },
        ],
      };
    }

    // 3.Yahan sirf filter kiya hua data hi aayega
    const users = await User.find(query).lean();
    console.log("Users found:", users);

    // 4. Render with both Admin Info and Users List
    res.render("superadmin/dashboard", {
      superAdmin: req.session.superAdmin,
      users: users,
      searchValue: search // Isse search bar mein typed text ruka rahega
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/superadmin/login");
  });
};

module.exports = {
  login,
  dashboard,
  logout
}












// exports.login = (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // env values
//     const adminEmail = process.env.SUPERADMIN_EMAIL;
//     const adminPassword = process.env.SUPERADMIN_PASSWORD;

//     if (email !== adminEmail || password !== adminPassword) {
//       return res.render("superadmin/login", {
//         error: "Invalid email or password"
//       });
//     }

//     // session set
//     req.session.superAdmin = {
//       email: adminEmail
//     };

//     res.redirect("/superadmin/dashboard");

//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// };

// exports.dashboard = (req, res) => {
//   res.render("superadmin/dashboard", {
//     superAdmin: req.session.superAdmin
//   });
// };

// exports.logout = (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/superadmin/login");
//   });
// };






