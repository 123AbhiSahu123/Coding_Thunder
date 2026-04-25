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
    // console.log("Users found:", users);

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

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Deleting user with ID:", userId); // Debugging line
        const result = await User.findByIdAndDelete(userId);
        if (result) {
            console.log("User successfully deleted", result);
        }else{
           console.log("User not found or not deleted:", result);
        }
        res.redirect("/superadmin/dashboard"); // Delete ke baad wapas dashboard par
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
    }
};

const getEditUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("superadmin/edit-user", { user });
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

// 2. Updated data ko Database mein save karne ke liye
const updateUser = async (req, res) => {
    try {
        const { name, email, password, phone, course } = req.body;
        await User.findByIdAndUpdate(req.params.id, {
            name, email, password, phone, course
        });
        res.redirect("/superadmin/dashboard");
    } catch (error) {
        res.status(500).send("Update Failed");
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
  deleteUser,
  getEditUser,
  updateUser,
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






