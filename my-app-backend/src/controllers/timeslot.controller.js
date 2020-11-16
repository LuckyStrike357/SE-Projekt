/**
 * Import models
 */
const db = require("../models");
var Timeslot = db.timeslot;
const Op = db.Sequelize.Op;

// Create and Save a new Timeslot
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Timeslot
    const timeslot = {
        start: req.body.start,
        end: req.body.end,
        capacity: req.body.capacity
    };

    // Save Timeslot in the database
    Timeslot.create(timeslot)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Timeslot."
            });
        });

};

// Retrieve all Timeslots from the database.
exports.findAll = (req, res) => {

    Timeslot.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving timeslots."
            });
        });
};

// Find a single Timeslot with an id
exports.findById = (req, res) => {
    const id = req.query.id;

    Timeslot.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving timeslot with id=" + id
            });
        });

};

// Find all timeslots for a specific date range
exports.findByDate = (req, res) => {

    let start = req.query.start
    let end = req.query.end

    Timeslot.findAll({ where: { start: { [Op.between]: [start, end] } } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving timeslots with start=" + start + " and end=" + end
            });
        });
};

// Retrieve booking count of specific timeslot
exports.countBookings = (req, res) => {

    let Booking = db.booking;
    let id = req.query.id

    Booking.count({ where: { timeslotId: id } })
        .then(count => {
            res.send({ count: count });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving booking count for timeslot with id=" + id
            });
        });
}

// Update a Timeslot by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;

    Timeslot.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Timeslot was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Timeslot with id=${id}. Maybe Timeslot was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Timeslot with id=" + id
            });
        });
};

// Delete a Timeslot with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;

    Timeslot.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Timeslot was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Timeslot with id=${id}. Maybe Timeslot was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Timeslot with id=" + id
            });
        });
};

// Delete all Timeslots from the database.
exports.deleteAll = (req, res) => {
    Timeslot.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Timeslots were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all timeslots."
            });
        });
};
