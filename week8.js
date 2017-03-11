// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// connect to the localhost mongo running on default port 27017
mongoose.connect("mongodb://localhost/web322");

// define the company schema
var companySchema = new Schema({
  "companyName": {
    type: String,
    unique: true
  },
  "address": String,
  "phone": String,
  "employeeCount": {
    "type": Number,
    "default": 0
  },
  "country": String
});
var Company = mongoose.model("web322_companies", companySchema);

// create a new company
var kwikEMart = new Company({
  companyName: "The Kwik-E-Mart",
  address: "Springfield",
  phone: "212-842-4923",
  employeeCount: 3,
  country: "U.S.A"
});

// save the company
kwikEMart.save((err) => {
  if(err) {
    console.log(`There was an error saving the Kwik-E-Mart company: ${err}`);
  } else {
    console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
  }
  Company.find({ companyName: "The Kwik-E-Mart" })
  .exec()
  .then((company) => {
    if(!company) {
      console.log("No company could be found");
    } else {
      console.log(company);
    }
    Company.update({ companyName: "The Leftorium"},
    { $set: { employeeCount: 4 } },
    { multi: false })
    .exec()
    .then(() => {
      Company.remove({ companyName: "The Leftorium" })
      .then(() => {
        // removed company
        console.log("removed company");
        // exit the program after saving
        process.exit();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  })
  .catch((err) => {
    console.log(`There was an error: ${err}`);
  });
});