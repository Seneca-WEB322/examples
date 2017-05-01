// setup our requires
const HTTP_PORT = 8080;
const express = require("express");
const exphbs = require("express-handlebars");

const app = module.exports = express();

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Register handlerbars as the rendering engine for views
app.set("views", "./week6-assets");
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// setup http server to listen on HTTP_PORT
app.listen(process.env.PORT || HTTP_PORT, onHttpStart);

app.get("/", (req, res) => {
  res.redirect("/viewdata");
});

app.get("/viewdata", (req, res) => {
  const employees = [{
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank"
  },
  {
    name: "Sarah",
    age: 32,
    occupation: "manager",
    company: "TD"
  }];

  res.render("viewdata", {
    employees: employees
  });
});