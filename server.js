var express = require("express");

var mongoose = require("mongoose");
var logger = require("morgan");
var exphbs  = require('express-handlebars');
var app = express();



app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




var PORT = process.env.PORT || 3000;




app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes are here becuase idk how to bootstrap from a different file
app.get("/scrape", function(req, res){
    res.send("hello, this will be updated later")
});

app.get('/', function(req, res){
    res.render("index");
})
  