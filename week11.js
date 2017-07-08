const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;
const WEEK11ASSETS = "./week11-assets/";

// Register handlerbars as the rendering engine for views
app.set("views", WEEK11ASSETS);
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static(path.join(WEEK11ASSETS,"public")));

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req, res) => {
  res.render("home");
});

// listen on port HTTP_PORT. The default port for http is 80. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);