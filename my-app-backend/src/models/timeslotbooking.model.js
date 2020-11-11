const sql = require('./db.js');

// constructor
const TimeslotBooking = function(timeslotbooking) {
  this.timeslot_id = timeslotbooking.timeslot_id;
  this.booking_id = timeslotbooking.booking_id;
};

TimeslotBooking.create = (newTimeslotBooking, result) => {
  sql.query("INSERT INTO timeslot_booking SET ?", newTimeslotBooking, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created timeslotbooking: ", { id: res.insertId, ...newTimeslotBooking });
    result(null, { id: res.insertId, ...newTimeslotBooking });
  });
};

TimeslotBooking.findById = (timeslotbookingId, result) => {
  sql.query(`SELECT * FROM timeslot_booking WHERE timeslot_id = ${timeslotbookingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found timeslotbooking: ", res);
      result(null, res);
      return;
    }

    // not found timeslotbooking with the id
    result({ kind: "not_found" }, null);
  });
};

TimeslotBooking.countById = (timeslotbookingId, result) => {
  sql.query(`SELECT count(*) as 'bookings' FROM timeslot_booking WHERE timeslot_id = ${timeslotbookingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found timeslotbooking: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found timeslotbooking with the id
    result({ kind: "not_found" }, null);
  });
};


TimeslotBooking.getAll = result => {
  sql.query("SELECT * FROM timeslot_booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("timeslotbookings: ", res);
    result(null, res);
  });
};

TimeslotBooking.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE timeslot_booking SET timeslot_id = ?, booking_id = ? WHERE timeslot_id = ? and booking_id = ?",
    [timeslotbooking.start, timeslotbooking.end, timeslotbooking.capacity, timeslotbooking.booking, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found timeslotbooking with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated timeslotbooking: ", { id: id, ...timeslotbooking });
      result(null, { id: id, ...timeslotbooking });
    }
  );
};

TimeslotBooking.remove = (id, result) => {
  sql.query("DELETE FROM timeslot_booking WHERE timeslot_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found timeslotbooking with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted timeslotbooking with id: ", id);
    result(null, res);
  });
};

TimeslotBooking.removeAll = result => {
  sql.query("DELETE FROM timeslot_booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} timeslotbooking`);
    result(null, res);
  });
};

module.exports = TimeslotBooking;
