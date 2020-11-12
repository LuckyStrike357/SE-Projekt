module.exports = app => {
  const timeslotbookings = require("../controllers/timeslotbooking.controller.js");
  const VerifyToken = require('../middleware/verifyToken.js');
  
  // Create a new booking for timeslot
  app.post("/timeslotbookings", timeslotbookings.create);

  // Retrieve all bookings in timeslots or filter by id or date range
  app.get('/timeslotbookings', async (req, res) => {

    let id = req.query.id;
    let count = req.query.count;

    //retrieve all timeslots and bookings
    if (id == undefined && count == undefined) {
      timeslotbookings.findAll(req, res)

      //retrieve booking count of timeslot
    } else if (id != undefined && count != undefined) {
      timeslotbookings.countById(req, res)

      //retrieve bookings by timeslot_id
    } else if (id != undefined) {
      timeslotbookings.findById(req, res)

      //else throw error
    } else {
      res.status(404).send();
    }

  });

  // Update a timeslotbooking with timeslotbookingId
  app.put("/timeslotbookings/:timeslotbookingId", VerifyToken, timeslotbookings.update);

  // Delete a timeslotbooking with timeslotbookingId
  app.delete("/timeslotbookings/:timeslotbookingId", VerifyToken, timeslotbookings.delete);

  // Delete all timeslotbookings
  app.delete("/timeslotbookings", VerifyToken, timeslotbookings.deleteAll);

};
