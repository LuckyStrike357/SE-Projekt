const Booking = require("../models/booking.model.js");

// Create and Save a new booking
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a booking
  const booking = new Booking({
    start: req.body.start,
    end: req.body.end,
    visitor: req.body.visitor
  });

  // Save booking in the database
  Booking.create(booking, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the booking."
      });
    else res.send(data);
  });
};

// Retrieve all bookings from the database.
exports.findAll = (req, res) => {
  Booking.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings."
      });
    else res.send(data);
  });
};

// Find a single booking with a bookingId
exports.findOne = (req, res) => {
  Booking.findById(req.params.bookingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found booking with id ${req.params.bookingId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving booking with id " + req.params.bookingId
        });
      }
    } else res.send(data);
  });
};

// Update a booking identified by the bookingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Booking.updateById(
    req.params.bookingId,
    new Booking(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found booking with id ${req.params.bookingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating booking with id " + req.params.bookingId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a booking with the specified bookingId in the request
exports.delete = (req, res) => {
  Booking.remove(req.params.bookingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found booking with id ${req.params.bookingId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete booking with id " + req.params.bookingId
        });
      }
    } else res.send({ message: `booking was deleted successfully!` });
  });
};

// Delete all bookings from the database.
exports.deleteAll = (req, res) => {
  Booking.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bookings."
      });
    else res.send({ message: `All bookings were deleted successfully!` });
  });
};

