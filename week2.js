var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var http = require("http");
var path = require("path");

var app = module.exports = express();

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup http server to listen on HTTP_PORT
var http_server = http.createServer(app);
http_server.listen(HTTP_PORT, onHttpStart);

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
  res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/week2-assets/about.html"));
});