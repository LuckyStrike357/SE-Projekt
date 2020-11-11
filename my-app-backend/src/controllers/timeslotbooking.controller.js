const TimeslotBooking = require("../models/timeslotbooking.model.js");

// Create and Save a new timeslotbooking
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a timeslotbooking
  const timeslotbooking = new TimeslotBooking({
    start: req.body.start,
    end: req.body.end,
    capacity: req.body.capacity,
    booking: req.body.booking
  });

  // Save timeslotbooking in the database
  TimeslotBooking.create(timeslotbooking, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the timeslotbooking."
      });
    else res.send(data);
  });
};


// Retrieve all timeslotbookings from the database.
exports.findAll = (req, res) => {
  TimeslotBooking.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving timeslotbookings."
      });
    else res.send(data);
  });
};

// Find a single timeslotbooking with a timeslotbookingId
exports.findById = (req, res) => {

  let id = req.query.id;

  TimeslotBooking.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found timeslotbooking with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving timeslotbooking with id " + id
        });
      }
    } else res.send(data);
  });

};

// Find all timeslotbookings for a specific date range
exports.findByDate = (req, res) => {

  let start = req.query.start
  let end = req.query.end

  TimeslotBooking.findByDate(start, end, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Found no timeslotbookings between date ${start} and ${end}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving timeslotbookings between date ${start} and ${end}.`
        });
      }
    } else res.send(data);
  });
};

// Update a timeslotbooking identified by the timeslotbookingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TimeslotBooking.updateById(
    req.params.timeslotbookingId,
    new TimeslotBooking(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found timeslotbooking with id ${req.params.timeslotbookingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating timeslotbooking with id " + req.params.timeslotbookingId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a timeslotbooking with the specified timeslotbookingId in the request
exports.delete = (req, res) => {
  TimeslotBooking.remove(req.params.timeslotbookingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found timeslotbooking with id ${req.params.timeslotbookingId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete timeslotbooking with id " + req.params.timeslotbookingId
        });
      }
    } else res.send({ message: `timeslotbooking was deleted successfully!` });
  });
};

// Delete all timeslotbookings from the database.
exports.deleteAll = (req, res) => {
  TimeslotBooking.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all timeslotbookings."
      });
    else res.send({ message: `All timeslotbookings were deleted successfully!` });
  });
};

