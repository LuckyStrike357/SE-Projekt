module.exports = app => {
  const bookings = require("../controllers/booking.controller.js");
  const VerifyToken = require('../middleware/verifyToken.js');

  // Create a new booking
  app.post("/bookings", bookings.create);

  // Retrieve all booking
  app.get("/bookings", VerifyToken, bookings.findAll);

  // Retrieve a single booking with bookingId
  app.get("/bookings/:bookingId", VerifyToken, bookings.findOne);

  // Update a booking with bookingId
  app.put("/bookings/:bookingId", VerifyToken, bookings.update);

  // Delete a booking with bookingId (authorization by email and booking date)
  app.delete("/bookings/:bookingId", bookings.delete);

  // Delete all bookings
  app.delete("/bookings", VerifyToken, bookings.deleteAll);

};
