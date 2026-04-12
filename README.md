#Express note
https://expressjs.com/

# Run express code :- node index.js or nodemon index.js

#Express handlebar notes
https://www.npmjs.com/package/express-handlebars
https://github.com/express-handlebars/express-handlebars/blob/master/README.md

>npm install express-handlebars

# navbar-expand-lg   lg screen par menu show and mobile view hamburger icon.

data
  -> blog.js
node modulse
public
view
  -> index.js
package-lock.json
package.json
vercel.json

#vercel.json:- deploy time
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "index.js" }
  ]
}

package.json:-
 {
   "name": "blog-express",
   "version": "1.0.0",
   "description": "This is a blog created by Abhi 🙌",
   "main": "api/index.js",
   
   "scripts": {     //this script add then run in terminal {npm run dev}. 
    "start": "node api/index.js",
  "dev": "nodemon --watch api --watch .env -L api/index.js"
  },
  
   "author": "Abhi",
   "license": "ISC",
   "dependencies": {
     "express-handlebars": "^8.0.1"
   },
   "dependencies": {
     "express": "^4.18.2",
     "express-handlebars": "^6.0.0"
   }
 }


Project Structure Express js website:- dynamically way

Blog-Express/
│
├── api/
│    ├── index.js             ← main server file
│    ├── routes/              ← all routes
│    │     ├── home.js
│    │     └── blog.js
│    ├── controllers/         ← route logic
│    │     ├── homeController.js
│    │     └── blogController.js
│    ├── data/                ← static data
│    │     └── blogs.js
│    └── middleware/          ← middlewares
│          └── logger.js
│
├── public/                   ← static files (images, css, js)
│    ├── image/
│    │     ├── A.jpg
│    │     ├── B.jpg
│    │     ├── C.jpg
│    ├── css/
│    └── js/
│
├── views/                    ← template engine
│    ├── layouts/
│    │     └── main.handlebars
│    ├── partials/
│    │     ├── header.handlebars
│    │     └── footer.handlebars
│    ├── home.handlebars
│    ├── blogHome.handlebars
│    └── blogPage.handlebars
│
├── package.json
└── README.md


#Express is a server side framework.

Quick start:-

npm init
package name: (express_js) expresstut
version: (1.0.0)
description: This is express js tutorial.
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\Users\DELL\OneDrive\Desktop\Programing\Express_Js\package.json:

npm install express --save

node_modules again install by this command npm i

#). "Thunder Client" is a extension. It is like that "Postman" So it is install in vs code.


#Globally install:-
npm install -g nodemon

#Local dependency install in project:-
npm install --save-dev nodemon
 
#if you go outer folder then use (../), (./), (.../) like that

#Flow of signup form:-
view/signupPage.handlebars --> js/signup.js --> models/User.js --> routes/userRoutes.js

# Mongodb Atlas se data dashboard me  data  fetch karne ke liye:-
project/
│
├── models/
│   └── User.js
│
├── routes/
│   └── auth.js
│
├── views/
│   ├── login.handlebars
│   ├── signup.handlebars
│   └── dashboard.handlebars   
│
├── app.js



#login page which file importent:-
{
  email: "admin@gmail.com",
  password: "123456",
  role: "admin"
}


✅ STEP 2: Login Page me ye details use karo
🔑 Login Credentials
Email: admin@gmail.com
Password: admin123


routes --> controllers --> loginPage.handlebars --> routes --> controllers --> middleware-->controllers



# app.get --> sirf index.js use
# router.get --> routes inner folder used only

* as your choice where your write code
    
# app.use("/superadmin", ...)  in index.js
# router.get("/dashboard", ...) hai -> URL hoga: localhost:3000/superadmin/dashboard
