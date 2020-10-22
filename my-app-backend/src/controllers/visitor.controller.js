const Visitor = require("../models/visitor.model.js");

// Create and Save a new visitor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a visitor
  const visitor = new Visitor({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    street: req.body.street,
    number : req.body.number,
    place : req.body.place,
    postal_code : req.body.postal_code,
    telephone : req.body.telephone,
  });

  // Save visitor in the database
  Visitor.create(visitor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the visitor."
      });
    else res.send(data);
  });
};

// Retrieve all visitors from the database.
exports.findAll = (req, res) => {
  Visitor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving visitors."
      });
    else res.send(data);
  });
};

// Find a single visitor with a visitorId
exports.findOne = (req, res) => {
  Visitor.findById(req.params.visitorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found visitor with id ${req.params.visitorId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving visitor with id " + req.params.visitorId
        });
      }
    } else res.send(data);
  });
};

// Update a visitor identified by the visitorId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Visitor.updateById(
    req.params.visitorId,
    new Visitor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found visitor with id ${req.params.visitorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating visitor with id " + req.params.visitorId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a visitor with the specified visitorId in the request
exports.delete = (req, res) => {
  Visitor.remove(req.params.visitorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found visitor with id ${req.params.visitorId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete visitor with id " + req.params.visitorId
        });
      }
    } else res.send({ message: `visitor was deleted successfully!` });
  });
};

// Delete all visitors from the database.
exports.deleteAll = (req, res) => {
  Visitor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all visitors."
      });
    else res.send({ message: `All visitors were deleted successfully!` });
  });
};

