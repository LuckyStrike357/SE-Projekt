/**
 * Routes for export endpoint 
 */

module.exports = app => {
    const bookings = require("../controllers/booking.controller.js");
    const VerifyToken = require('../middleware/verifyToken.js');

    // Retrieve visitors who had scanned bookings in given time frame
    app.get("/export", VerifyToken, async (req, res) => {
        let start = req.query.start;
        let end = req.query.end;

        if (start && end) {
            bookings.exportVisitors(req, res);

            // else throw error
        } else {
            res.status(404).send();
        }

    });


};
