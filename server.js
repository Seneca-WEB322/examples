const HTTP_PORT = 8080;
const express = require("express");
const http = require("http");
const path = require("path");

const app = module.exports = express();

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on port: " + HTTP_PORT);
}

// setup http server to listen on HTTP_PORT
const http_server = http.createServer(app);
http_server.listen(process.env.PORT || HTTP_PORT, onHttpStart);

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req,res) => {
  res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
});

// setup another route to listen on http://localhost/about
app.get("/about", (req,res) => {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});
