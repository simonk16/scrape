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


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  