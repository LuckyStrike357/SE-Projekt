const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

// sync with the database
const db = require("./models/index");
db.sequelize.sync({ force: true }).then(res => { run() });

//create some data
const run = async () => {
  let visitor1 = await db.visitor.create({
    email: "test@test.de",
    first_name: "Max",
    last_name: "Mustermann",
    street: "Musterstraße",
    number: 1,
    city: "Musterstadt",
    postal_code: 123456,
    telephone: "+49 123 456789",
  })

  let visitor2 = await db.visitor.create({
    email: "test@test.de",
    first_name: "Max",
    last_name: "Mustermann",
    street: "Musterstraße",
    number: 1,
    city: "Musterstadt",
    postal_code: 123456,
    telephone: "+49 123 456789",
  })

  let timeslot1 = await db.timeslot.create({
    start: "2020-11-10 08:00:00",
    end: "2020-11-10 09:59:59",
    capacity: 100
  })

  let timeslot2 = await db.timeslot.create({
    start: "2020-11-12 08:00:00",
    end: "2020-11-12 09:59:59",
    capacity: 150
  })

  await db.booking.create({
    visitorId: visitor1.id,
    timeslotId: timeslot1.id
  })

  await db.booking.create({
    visitorId: visitor2.id,
    timeslotId: timeslot2.id
  })

  var bcrypt = require('bcryptjs');
  await db.user.create({
    first_name: "Test",
    last_name: "Testuser",
    username: "testuser",
    password: bcrypt.hashSync("password123", 8)
  })

};

// implement the api routes
require("./routes/visitor.routes.js")(app);
require("./routes/booking.routes.js")(app);
require("./routes/timeslot.routes.js")(app);
require("./routes/auth.routes.js")(app);


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
