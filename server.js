var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var hbs = require('hbs');

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
    res.render('index');
});

router.get("/about",function(req,res){
    res.render('about');
});

router.get("/contact",function(req,res){
  res.render('contact');
});

app.use("/",router);

app.use(express.static("public"));
// app.use(express.static(__dirname + '/public'));

app.use("*",function(req,res){
    res.render('404');
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
