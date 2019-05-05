//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser"); //Deprecated

var mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


var strStore;

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


app.get("/search", function(req, res) {
  con.query("SELECT * from store", function(err, results, fields) {
    if (err) console.log(err);
    res.render('search', {
      searchValue: results
    });
  });
});

app.post("/search", function(req, res) {
  res.redirect("/search");
});

app.get("/login", function(req, res) {
  res.render('login', {});
});

app.post("/logintry", function(req,res){
  //Section for success or fail
  var useremail = req.body.uname;
  var userpass = req.body.upassword;
  // This query has no protection from SQL injection
  con.query("SELECT * FROM customer WHERE email = '" + useremail + "' AND user_password = '" + userpass + "'", function(err,results,fields){
    if(err) console.log(err);
    console.log(results);
    if(results == ""){
      res.redirect('loginfail');
    }else{
      res.redirect('loginsuccess');
    }
  });
});

app.get("/loginfail",function(req,res){
  res.render('loginfail');
});
app.get("/loginsuccess",function(req,res){
  res.render('loginsuccess');
});

app.get("/store", function(req, res) {
  res.render('store',{});
});

app.get("/storeselected" ,function(req,res){
  strStore = strStore.substring(5);
  var strNumber = parseInt(strStore);
  if (strStore != undefined) {
    con.query("SELECT * FROM inventory_item WHERE store_store_number = '" + con.escape(strNumber) + "'", function(err, results, fields) {
      if (err) console.log(err);
      res.render('storeselected', {
        storeQuery: results
      });
    });
  }
});

app.post("/storeselected", function(req, res) {
  strStore = req.body.selection;
  res.redirect('storeselected');
});

app.post("/deleteitem",function(req,res){
  var itemtodelete = req.body.deletepress;
  con.query("DELETE FROM inventory_item WHERE upc_code = '" + itemtodelete + "'", function(err,results,fields){
    if(err) console.log(err);
    res.redirect('store');
  });
});

app.get("/sales",function(req,res){
  con.query("SELECT DISTINCT first_name,last_name FROM customer NATURAL JOIN sale WHERE sale_year = 2019", function(err, results, fields) {
    if (err) console.log(err);
    res.render('sales',{happyCustomers: results});
  });
});

app.get("/freqshopper",function(req,res){
  res.render('freqshopper');
});

app.post("/freqshopper",function(req,res){
  var uemail = req.body.uemail;
  var usubscribe = req.body.subscribe;
  if(req.body.uemail != "" && req.body.subscribe != undefined){
    con.query("INSERT INTO frequent_shopper VALUES ('" + uemail + "','" + usubscribe + "', 1)");
    res.render('freqshopper');
  }
});

app.listen(3000, function() {
  console.log("Server started on port:3000");
});

//con.end();
