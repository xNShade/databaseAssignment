//jshint esversion:6

const express = require("express");
//const bodyParser = require("body-parser"); //Deprecated
//use app.use(bodyParser.json());
//and app.use(bodyParser.urlencoded({extended: true}));
var mysql = require("mysql");

const app = express();

app.set('view engine','ejs');
//----------- Ryan - section to connect to DB
var con = mysql.createConnection({
  host: "localhost",    // ip address of server running mysql
  user: "user1",         // user name to your mysql database
  password: "password",   // corresponding password
  database: "smal_mart"
});

con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

con.end();
//--------- Ryan - end DB connection section
app.get("/", function(req, res){
  res.render('index',{});
});

app.get("/login", function(req,res){
  res.render('login',{});
});

app.get("/Store1", function(req,res){
  res.render('store1',{});
});

app.listen(3000, function(){
  console.log("Server started on port:3000");
});
