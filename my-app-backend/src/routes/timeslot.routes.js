module.exports = app => {
  const timeslots = require("../controllers/timeslot.controller.js");
  const VerifyToken = require('../middleware/verifyToken.js');

  // Query and retrieve timeslots
  app.get('/timeslots', async (req, res) => {

    let id = req.query.id;
    let count = req.query.count;
    let start = req.query.start;
    let end = req.query.end;

    // retrieve all timeslots
    if (!id && !count && !start && !end) {
      timeslots.findAll(req, res)

      // retrieve single timeslot by id
    } else if (id && !count) {
      timeslots.findById(req, res)

      // retrieve single timeslot by id and count existing bookings
    } else if (id && count) {
      timeslots.findAndCount(req, res)

      // retrieve timeslot(s) by date range
    } else if (start && end) {
      timeslots.findByDate(req, res)

      // else throw error
    } else {
      res.status(404).send();
    }

  });

  // Create a new timeslot
  app.post("/timeslots", VerifyToken, timeslots.create);

  // Update a timeslot with timeslotId
  app.put("/timeslots/:timeslotId", VerifyToken, timeslots.update);

  // Delete a timeslot with timeslotId
  app.delete("/timeslots/:timeslotId", VerifyToken, timeslots.delete);

  // Delete all timeslots
  app.delete("/timeslots", VerifyToken, timeslots.deleteAll);

};
