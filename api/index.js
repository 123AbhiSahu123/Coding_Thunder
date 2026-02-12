// ---------------- Existing Code ----------------
const express = require('express');
const path = require('path');
require('dotenv').config({ path: '../.env' });
const blogs = require('./data/blogs');
const accorddian = require('./data/accorddian');
const { engine } = require('express-handlebars');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require('./routes/userRoutes');
const superAdminRoutes = require("./routes/superAdminRoutes");
const port = process.env.PORT || 3000;
const session = require("express-session");
const app = express();

// Handlebars Setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "../views"));

// Middleware
app.use(express.urlencoded({ extended: false }));


app.set("trust proxy", 1);
// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret123",
        resave: false,
        saveUninitialized: false,
        cookie: {
      secure: process.env.NODE_ENV === "production" ? true : false // production me true only if HTTPS
    }
    })
);

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

connectDB();

// Routes
app.use("/", authRoutes);
app.use("/admin", adminRoutes);

// ---------------- Add User Routes ----------------
app.use('/api/users', userRoutes);

//adding super admin routes
app.use("/superadmin", superAdminRoutes);
// ---------------- Existing Routes ----------------

app.get('/', (req, res) => {
    res.render('home', { isHome: true });
});

app.get('/blogs', (req, res) => {
    res.render('blogHome', {
        blogs: blogs,
        isBlogs: true
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
        accorddian: accorddian,
        isAccordion: true
    });
});

app.get('/signup', (req, res) => {
    res.render('signupPage', { isSignUp: true });
});

app.get('/login', (req, res) => {
    res.render('login', { islogin: true });
});


app.listen(port, () => {
    console.log(`Blog app listening on port at http://localhost:${port}`)
});

module.exports = app;













































































