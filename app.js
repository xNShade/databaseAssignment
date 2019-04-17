//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine','ejs');

app.get("/", function(req, res){
  res.render('index',{});
});

app.get("/login", function(req,res){
  res.render('login',{});
});

app.listen(3000, function(){
  console.log("Server started on port:3000");
});
