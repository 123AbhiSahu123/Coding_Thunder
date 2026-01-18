
// ---------------- Existing Code ----------------
const express = require('express');
require('dotenv').config({ path: '../.env' });
const blogs = require('./data/blogs');
const accorddian = require('./data/accorddian');
const { engine } = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
// const port = process.env.PORT || 3000;
const session = require("express-session");
const app = express();

// Handlebars Setup
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "../views"));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")));


// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", authRoutes);
app.use("/admin", adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
    });

// ---------------- Add User Routes ----------------
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// ---------------- Existing Routes ----------------

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/blogs', (req, res) => {
    res.render('blogHome', {
        blogs: blogs
    })
});

app.get('/blogpost/:slug', (req, res) => {
    myBlog = blogs.filter((e) => {
        return e.slug == req.params.slug
    })
    res.render('blogPage', {
        title: myBlog[0].title,
        content: myBlog[0].content,
        trainer: myBlog[0].trainer,
        slug: myBlog[0].slug
    })
});


app.get('/accorddian', (req, res) => {
    res.render('accorddianHome', {
        accorddian: accorddian
    });
});

app.get('/signup', (req, res) => {
    res.render('signupPage');
});

app.get('/login', (req, res) => {
    res.render('loginPage');
});

console.log("MONGO_URI =>", process.env.MONGO_URI);


// app.listen(port, () => {
//     console.log(`Blog app listening on port at http://localhost:${port}`)
// });

module.exports = app;





































