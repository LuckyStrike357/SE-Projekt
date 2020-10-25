module.exports = app => {
  const timeslots = require("../controllers/timeslot.controller.js");

  // Create a new timeslot
  app.post("/timeslots", timeslots.create);

  // Retrieve all timeslot
  app.get("/timeslots", timeslots.findAll);

  // Retrieve a single timeslot with timeslotId
  app.get("/timeslots/:timeslotId", timeslots.findOne);

  // Update a timeslot with timeslotId
  app.put("/timeslots/:timeslotId", timeslots.update);

  // Delete a timeslot with timeslotId
  app.delete("/timeslots/:timeslotId", timeslots.delete);

  // Delete all timeslots
  app.delete("/timeslots", timeslots.deleteAll);
};
