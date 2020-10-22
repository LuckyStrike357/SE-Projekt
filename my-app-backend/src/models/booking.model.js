const sql = require("./db.js");

// constructor
const Booking = function(booking) {
  this.start = booking.start;
  this.end = booking.end;
  this.visitor  = booking.visitor;
};

Booking.create = (newBooking, result) => {
  sql.query("INSERT INTO booking SET ?", newBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
  });
};

Booking.findById = (bookingId, result) => {
  sql.query(`SELECT * FROM booking WHERE id = ${bookingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found booking with the id
    result({ kind: "not_found" }, null);
  });
};

Booking.getAll = result => {
  sql.query("SELECT * FROM booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bookings: ", res);
    result(null, res);
  });
};

Booking.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE booking SET start = ?, end = ?, visitor = ? WHERE id = ?",
    [booking.start, booking.end, booking.visitor, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found booking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated booking: ", { id: id, ...booking });
      result(null, { id: id, ...booking });
    }
  );
};

Booking.remove = (id, result) => {
  sql.query("DELETE FROM booking WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found booking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted booking with id: ", id);
    result(null, res);
  });
};

Booking.removeAll = result => {
  sql.query("DELETE FROM booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} booking`);
    result(null, res);
  });
};

module.exports = Booking;
