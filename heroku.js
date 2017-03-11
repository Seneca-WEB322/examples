const HTTP_PORT = process.env.PORT || 8080,
    express = require("express"),
    http = require("http");

var app = module.exports = express();

// setup http server to listen on HTTP_PORT
var http_server = http.createServer(app);
http_server.listen(HTTP_PORT);

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!");
});