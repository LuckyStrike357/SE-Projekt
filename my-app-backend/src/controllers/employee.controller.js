const Employee = require("../models/employee.model.js");

// Create and Save a new employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a employee
  const employee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });

  // Save employee in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee."
      });
    else res.send(data);
  });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    else res.send(data);
  });
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
  Employee.findById(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving employee with id " + req.params.employeeId
        });
      }
    } else res.send(data);
  });
};

// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Employee.updateById(
    req.params.employeeId,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found employee with id ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete employee with id " + req.params.employeeId
        });
      }
    } else res.send({ message: `employee was deleted successfully!` });
  });
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    else res.send({ message: `All employees were deleted successfully!` });
  });
};

