const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/week9-assets/index.html"));
});

app.get("/api/users", (req, res) => {
    res.json({message: "fetch all users"});
});

app.post("/api/users", (req, res) => {
     res.json({message: "add the user: " + req.body.fName + " " + req.body.lName});
});

app.get("/api/users/:userId", (req, res) => {
    res.json({message: "get user with Id: " + req.params.userId});
});

app.put("/api/users/:userId", (req, res) => {
    res.json({message: "update User with Id: " + req.params.userId + " to " + req.body.fName + " " + req.body.lName});
});

app.delete("/api/users/:userId", (req, res) => {
     res.json({message: "delete User with Id: " + req.params.userId});
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
});