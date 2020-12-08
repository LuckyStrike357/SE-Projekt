/**
 * Import models
 */
const db = require("../models");
var Booking = db.booking;
const Op = db.Sequelize.Op;

// Create and Save a new Booking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.visitorId || !req.body.timeslotId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Booking
    const booking = {
        visitorId: req.body.visitorId,
        timeslotId: req.body.timeslotId
    };

    // Save Booking in the database
    Booking.create(booking)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Booking."
            });
        });

};

// Retrieve all Bookings from the database.
exports.findAll = (req, res) => {

    Booking.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bookings."
            });
        });
};

// Find a single Booking with an id
exports.findOne = (req, res) => {
    const id = req.params.bookingId;

    Booking.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving booking with id=" + id
            });
        });

};

// Update a Booking by the id in the request
exports.update = (req, res) => {
    const id = req.params.bookingId;

    Booking.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Booking was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Booking with id=" + id
            });
        });
};

// Delete a Booking with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.bookingId;
    const email = req.body.email;
    const date = req.body.date;

    //check if given email and date are associated with the booking
    let Timeslot = db.timeslot;
    let Visitor = db.visitor;

    //include associated tables
    const booking = await Booking.findOne({
        where: {
            id: id
        },
        include: [
            { model: Timeslot },
            { model: Visitor }
        ]
    });

    //if there is a booking with the id
    if (booking !== null) {
        const associatedVisitorMail = booking.visitor.email;
        const associatedTimeslotDate = new Date(booking.timeslot.start);

        const comparableDate = associatedTimeslotDate.getFullYear() + "-" + (associatedTimeslotDate.getMonth() + 1) + "-" + associatedTimeslotDate.getDate()

        if (associatedVisitorMail === email && comparableDate === date) {
            Booking.destroy({
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: "Booking was deleted successfully!"
                        });
                    } else {
                        res.send({
                            message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Could not delete Booking with id=" + id
                    });
                });

        } else {
            res.status(403).send({ auth: false, message: 'Wrong data provided.' });
        }
        
    } else {
        res.status(500).send({
            message: "Error retrieving Booking with id=" + id
        });
    }
};

// Delete all Bookings from the database.
exports.deleteAll = (req, res) => {
    Booking.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Bookings were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all bookings."
            });
        });
};
