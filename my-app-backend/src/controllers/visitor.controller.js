/**
 * Controller for the Visitor endpoints
 */
const db = require("../models");
var Visitor = db.visitor;
const Op = db.Sequelize.Op;

// Create and Save a new Visitor
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Visitor
    const visitor = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        street: req.body.street,
        number: req.body.number,
        city: req.body.city,
        postal_code: req.body.postal_code,
        telephone: req.body.telephone,
    };

    // Save Visitor in the database
    Visitor.create(visitor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Visitor."
            });
        });

};

// Retrieve all Visitors from the database.
exports.findAll = (req, res) => {

    Visitor.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving visitors."
            });
        });
};

// Find a single Visitor with an id
exports.findOne = (req, res) => {
    const id = req.params.visitorId;

    Visitor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving visitor with id=" + id
            });
        });

};


// Update a Visitor by the id in the request
exports.update = (req, res) => {
    const id = req.params.visitorId;

    Visitor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Visitor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Visitor with id=${id}. Maybe Visitor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Visitor with id=" + id
            });
        });
};

// Delete a Visitor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.visitorId;

    Visitor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Visitor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Visitor with id=${id}. Maybe Visitor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Visitor with id=" + id
            });
        });
};

// Delete all Visitors from the database.
exports.deleteAll = (req, res) => {
    Visitor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Visitors were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all visitors."
            });
        });
};
