var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//DB Connection details
var con = mysql.createConnection({
  host: "mysql.razs.me",
  user: "amazon_db_user",
  password: "phIhUc9&ecUS3iGe13Br",
  database: "react_amazon",
});

con.connect(() => {
  console.log("Connectted");
});
//Fetching all the records from the table
app.get("/users", function (req, res) {
  console.log("Befor executing query");
  con.query("SELECT * FROM murali where ", function (error, results) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Murali Table list.",
    });
  });
  console.log("After executing query");
});

app.get("/",(req,res) => {
  res.send('The success message for /');
})

// Fetching single record from the table

app.get("/singleuser", function (req, res) {
  console.log("Befor executing query");
  con.query("SELECT * FROM murali WHERE name = 'Manu'", function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Murali Table list.",
    });
  });
  console.log("After executing query");
});

// Add a new user
app.post("/user", function (req, res) {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let state = req.body.state;
  console.log('Name -->'+name);
  console.log('mobile -->'+mobile);
  console.log('State -->'+state);
  if (!name) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }
  //"INSERT INTO `murali` (`name`, `mobile`, `state`) VALUES ("+name+", "+mobile+", "+state+")"
  con.query("INSERT INTO murali SET ? ", [{name : name,mobile : mobile,state : state}], function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New user has been created successfully.",
    });
  });
});

// set port
app.listen(3000, function () {
  console.log("Node app is running on port 3000");
});
