const express = require("express");
const http = require("http");
const exphbs = require('express-handlebars');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.PORT || 8080;
const WEEK7ASSETS = "./week7-assets/";

const app = module.exports = express();

// instruct the app to use the "bodyparser" middleware
app.use(bodyParser.urlencoded({ extended: true }));

// instruct the app to use express handlebars for the view engine with the .hbs extension
app.set("views", WEEK7ASSETS);
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static(WEEK7ASSETS));

// define the connection to our Postgres instance 
var sequelize = new Sequelize('database', 'user', 'password', {
    host: 'host',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

// Define our Models - "Name"

var Name = sequelize.define('Name', {
    fName: Sequelize.STRING,  // first Name
    lName: Sequelize.STRING, // Last Name
});

// create our server using the http module
var http_server = http.createServer(app);

// synchronize the database before we do anything else
sequelize.sync().then(function () {

    // start the server to listen on HTTP_PORT
    http_server.listen(process.env.PORT || HTTP_PORT);

    // define the "/" route
    app.get("/", (req, res) => {

        // fetch all of the names and order them by id
        Name.findAll({
            order: ['id']
        }).then(function (data) {
            // render the "viewTable" view with the data
            res.render('viewTable', {
                data: data
            });
        });
    });

    // define the "/updateName" route
     app.post("/updateName", (req, res) => {
        
        // check to see if both first name & last name fields are blank
        if(req.body.lName.length == 0 && req.body.fName.length == 0){
            // remove a record from the  "Name" model with the data from req.body
            Name.destroy({
                where: { id: req.body.id } 
            }).then(function () { 
                console.log("successsfully removed user: " + req.body.id);
                res.redirect("/"); // redirect back to the home page
            });
        }else{
            // update a record using the "Name" model with the data from req.body
            Name.update({
                lName: req.body.lName,
                fName: req.body.fName
            }, {
                where: { id: req.body.id } 
            }).then(function () { 
                console.log("successfully updated name: " + req.body.id);
                res.redirect("/"); // redirect back to the home page
            });
        }
    });

    // define the "/addName" route
     app.post("/addName", (req, res) => {
         // create a record using the "Name" model with the data from req.body
         Name.create({
              lName: req.body.lName,
              fName: req.body.fName
          }).then(function () { 
              console.log("successfully created a new name");
              res.redirect("/"); 
          });
    });

});