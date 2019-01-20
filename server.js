var express = require("express");
var logger = require("morgan");

var mongoose = require("mongoose");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(`public`));

const exphbs = require(`express-handlebars`);

app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

// Connect to the Mongo DB
mongoose.connect(`mongodb://localhost/newsScraper`, { useNewUrlParser: true });

//Importing the routes
require(`./routes/api-routes.js`)(app);
require(`./routes/html-routes.js`)(app);

// Start the server
app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`);
});
