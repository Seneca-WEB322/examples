// setup our requires
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
  destination: "./photos/",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });

// setup the static folder that static resources can load from
// we need this so that the photo can be loaded from the server
// by the browser after sending it
app.use(express.static("./"));

// setup a route on the 'root' of the url that has our form
// IE: http://localhost/
app.get("/", (req, res) => {
  // send the html view with our form to the client
  res.sendFile("week5.html", { root: __dirname });
});

// now add a route that we can POST the form data to
// IE: http://localhost/register-user
// add the middleware function (upload.single("photo")) for multer to process the file upload in the form
// the string you pass the single() function is the value of the
// 'name' attribute on the form for the file input element
app.post("/register-user", upload.single("photo"), (req, res) => {
  const formData = req.body;
  const formFile = req.file;

  const dataReceived = "Your submission was received:&lt;br/&gt;&lt;br/&gt;" +
    "Your form data was:&lt;br/&gt;" + JSON.stringify(formData) + "&lt;br/&gt;&lt;br/&gt;" +
    "Your File data was:&lt;br/&gt;" + JSON.stringify(formFile) +
    "&lt;br/&gt;&lt;p&gt;This is the image you sent:&lt;br/&gt;&lt;img src='/photos/" + formFile.filename + "'/&gt;";
  res.send(dataReceived);
});

app.listen(80);