const Timeslot = require("../models/timeslot.model.js");

// Create and Save a new timeslot
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a timeslot
  const timeslot = new Timeslot({
    start: req.body.start,
    end: req.body.end,
    capacity: req.body.capacity,
    booking: req.body.booking
  });

  // Save timeslot in the database
  Timeslot.create(timeslot, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the timeslot."
      });
    else res.send(data);
  });
};

// Retrieve all timeslots from the database.
exports.findAll = (req, res) => {
  Timeslot.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving timeslots."
      });
    else res.send(data);
  });
};

// Find a single timeslot with a timeslotId
exports.findOne = (req, res) => {
  Timeslot.findById(req.params.timeslotId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found timeslot with id ${req.params.timeslotId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving timeslot with id " + req.params.timeslotId
        });
      }
    } else res.send(data);
  });
};

// Update a timeslot identified by the timeslotId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Timeslot.updateById(
    req.params.timeslotId,
    new Timeslot(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found timeslot with id ${req.params.timeslotId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating timeslot with id " + req.params.timeslotId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a timeslot with the specified timeslotId in the request
exports.delete = (req, res) => {
  Timeslot.remove(req.params.timeslotId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found timeslot with id ${req.params.timeslotId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete timeslot with id " + req.params.timeslotId
        });
      }
    } else res.send({ message: `timeslot was deleted successfully!` });
  });
};

// Delete all timeslots from the database.
exports.deleteAll = (req, res) => {
  Timeslot.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all timeslots."
      });
    else res.send({ message: `All timeslots were deleted successfully!` });
  });
};

