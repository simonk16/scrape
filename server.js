const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const exphbs  = require('express-handlebars');
const app = express();



app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

require("./routes/apiRoutes") (app);
require("./routes/htmlRoutes")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("App running on port " + PORT + "!"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
  