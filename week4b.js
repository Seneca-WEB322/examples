const express = require("express");
const app = express();

// setup the static folder that static resources can load from// like images, css files, etc.
app.use(express.static("static"));

// setup a route on the 'root' of the url
// IE: http://localhost:3000/
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my simple website</h1><br /><p>Be sure to visit the <a href='/headers'>headers page</a> to see what headers were sent from your browser to the server!</p>");
});

// now add a route for the /headers page
// IE: http://localhost:3000/headers
app.get("/headers", (req, res) => {
  const headers = req.headers;
  res.send(headers);
});

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will always fire because it has no specific route attached to it.
// This means we can use it as a sort of 'catch all' for requests that don't match
// one of the above routes.
// We use this function to handle 404 requests to pages that are not found.
app.use(function(req, res) {
  res.status(404).send("Page Not Found");
});

app.listen(3000);