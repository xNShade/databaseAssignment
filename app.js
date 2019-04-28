//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser"); //Deprecated
var mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
//----------- Ryan - section to connect to DB
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "user1", // user name to your mysql database
  password: "password", // corresponding password
  database: "smal_mart"
});

con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
//--------- Ryan - end DB connection section


app.get("/", function(req, res) {
  res.render('index', {});
});

app.get("/login", function(req, res) {
  res.render('login', {});
});

app.post("/login",function(req,res){
  var user = req.body.uname;
  var password = req.body.upassword;
  //Query database to see if username and password match
  // if username and password match
  // tell them thanks.
  // else
  // tell them invalid Login
  //Probably will just keep this part super simple.
});

app.get("/store", function(req, res) {
  res.render('store', {});
});

app.post("/store", function(req, res) {
  var storeget = req.body.storeselect;
  var itemcheck = req.body.searchitem;
  // You can con.query the storeget variable here to pass into the page
  // And query the itemcheck variable here to pass into the page if needed.
  if (itemcheck === "") {
    //This will be the browsing of a store
  } else {
    //This will browse the store for the specific item
  }
});

app.listen(3000, function() {
  console.log("Server started on port:3000");
});
