/**
 * Initializes the node express server
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/build')));

// sync with the database
const db = require("./models/index");

// set "force: false" in order to prevent existing data being overwritten!
db.sequelize.sync({ force: true }).then(res => { run() });

//create some data
const run = async() => {
    let visitor1 = await db.visitor.create({
        email: "test@test.de",
        first_name: "Max",
        last_name: "Mustermann",
        street: "Musterstrasse",
        number: 1,
        city: "Musterstadt",
        postal_code: 123456,
        telephone: "+49 123 456789",
    })

    let visitor2 = await db.visitor.create({
        email: "test@test.de",
        first_name: "Max",
        last_name: "Mustermann",
        street: "Musterstrasse",
        number: 1,
        city: "Musterstadt",
        postal_code: 123456,
        telephone: "+49 123 456789",
    })

    let visitor3 = await db.visitor.create({
        email: "test@test.de",
        first_name: "Max",
        last_name: "Mustermann",
        street: "Musterstrasse",
        number: 1,
        city: "Musterstadt",
        postal_code: 123456,
        telephone: "+49 123 456789",
    })

    let visitor4 = await db.visitor.create({
        email: "test@test.de",
        first_name: "Max",
        last_name: "Mustermann",
        street: "Musterstrasse",
        number: 1,
        city: "Musterstadt",
        postal_code: 123456,
        telephone: "+49 123 456789",
    })

    //get current day to create timeslot
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()

    let startTime = year + "-" + month + "-" + day + " 08:00:00"
    let endTime = year + "-" + month + "-" + day + " 09:59:59"

    let timeslot1 = await db.timeslot.create({
        start: startTime,
        end: endTime,
        capacity: 100
    })

    startTime = year + "-" + month + "-" + (day + 1) + " 08:00:00"
    endTime = year + "-" + month + "-" + (day + 1) + " 09:59:59"

    let timeslot2 = await db.timeslot.create({
        start: startTime,
        end: endTime,
        capacity: 150
    })

    // create old timeslot to display deletion algorithmn
    today.setDate(today.getDate() - 30)
    year = today.getFullYear()
    month = today.getMonth() + 1
    day = today.getDate()


    startTime = year + "-" + month + "-" + (day - 1) + " 08:00:00"
    endTime = year + "-" + month + "-" + (day + 1) + " 09:59:59"
    let timeslot3 = await db.timeslot.create({
        start: startTime,
        end: endTime,
        capacity: 150
    })

    await db.booking.create({
        visitorId: visitor1.id,
        timeslotId: timeslot3.id

    })

    await db.booking.create({
        visitorId: visitor2.id,
        timeslotId: timeslot1.id
    })

    await db.booking.create({
        visitorId: visitor3.id,
        timeslotId: timeslot2.id
    })

    await db.booking.create({
        visitorId: visitor4.id,
        timeslotId: timeslot2.id,
        scanned: true
    })

    var bcrypt = require('bcryptjs');
    await db.user.create({
        first_name: "Test",
        last_name: "Testuser",
        username: "testuser",
        password: bcrypt.hashSync("password123", 8)
    })

};

// implement the backend routes
require("./routes/visitor.routes.js")(app);
require("./routes/booking.routes.js")(app);
require("./routes/timeslot.routes.js")(app);
require("./routes/auth.routes.js")(app);
require("./routes/export.routes.js")(app);

// get everything else to render the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

// set port, listen for requests
app.listen(80, () => {
    console.log("Server is running on port 80.");
});