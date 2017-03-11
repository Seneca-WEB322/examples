// require the HTTP module
var http = require("http");

// define a port to listen to
const PORT= process.env.PORT || 8080; 

// create a function which handles requests and sends a response
function handleRequest(req, res){
  res.end("Hello World from: " + req.url);
}

// create a server and pass it a function that will handle the incoming requests
var server = http.createServer(handleRequest);

// start the server
server.listen(PORT, () => {
    // this callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: %s", PORT);
});