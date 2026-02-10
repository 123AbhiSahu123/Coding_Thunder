const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  role: {
    type: String,
    // enum: [ "user", "admin"],
    default: "admin", // sirf admin login
  },
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);









// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   course: { type: String, required: true },
//   role: {
//     type: String,
//     default: "admin", // sirf admin login
//   },
// },
// { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
