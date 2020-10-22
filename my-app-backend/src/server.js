const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
/*
app.get('/',(req,res) => {
  res.json({ message: "Hello world." });
})
*/

app.use(express.static(path.join(__dirname,'/build')));

app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})


//get the routes
require("./routes/customer.routes.js")(app);
require("./routes/visitor.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
