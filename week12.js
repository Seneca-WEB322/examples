const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");
const fs = require("fs");
const http = require("http");
const https = require("https");

const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 443;
const WEEK12ASSETS = "./week12-assets/";
const SSL_KEY_FILE = WEEK12ASSETS + "server.key";
const SSL_CRT_FILE = WEEK12ASSETS + "server.crt";

// read in the contents of the HTTPS certificate and key
const https_options = {
  key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
  cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};

// A simple user object, hardcoded for this example
const user = {
  username: "sampleuser",
  password: "samplepassword",
  email: "sampleuser@example.com"
};

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// call this function after the https server starts listening for requests
function onHttpsStart() {
  console.log("Express https server listening on: " + HTTPS_PORT);
}

// This is a helper middleware function that checks if a user is logged in
// we can use it in any route that we want to protect against unauthenticated access.
// A more advanced version of this would include checks for authorization as well after
// checking if the user is authenticated
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

// Register handlerbars as the rendering engine for views
app.set("views", WEEK12ASSETS);
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static(WEEK12ASSETS));

// Setup client-sessions
app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "week10example_web322", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a route on the 'root' of the url to redirect to /login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Display the login html page
app.get("/login", (req, res) => {
  res.render("login", { });
});

// The login route that adds the user to the session
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username === "" || password === "") {
    // Render 'missing credentials'
    return res.render("login", { errorMsg: "Missing credentials." });
  }

  if(username === user.username && password === user.password) {
    // Add the user on the session and redirect them to the dashboard page.
    // We have to copy the user properties here rather than use
    // req.session.user = user;
    // If we did that, it would set req.session.user to be a REFERENCE to the user object
    // and when we delete the password your user won't be able to log back in after logging out.
    // The password would be deleted from both the req.session.user AND the user const
    req.session.user = {
      username: user.username,
      password: user.password,
      email: user.email
    };
    // delete the password from the session for security purposes
    // you should never send a users password back to the client
    // even if the password AND session are encrypted. There is just
    // no need for it.
    delete req.session.user.password;
    res.redirect("/dashboard");
  } else {
    // render 'invalid username or password'
    res.render("login", { errorMsg: "invalid username or password!"});
  }
});

// Log a user out by destroying their session
// and redirecting them to /login
app.get("/logout", (req, res) => {
  req.session.reset();
  res.redirect("/login");
});

// An authenticated route that requires the user to be logged in.
// Notice the middleware 'ensureLogin' that comes before the function
// that renders the dashboard page
app.get("/dashboard", ensureLogin, (req, res) => {
  res.render("dashboard", {user: req.session.user});
});

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});


// listen on ports HTTP_PORT and HTTPS_PORT. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(https_options, app).listen(HTTPS_PORT, onHttpsStart);