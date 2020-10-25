const sql = require("./db.js");

// constructor
const Timeslot = function(timeslot) {
  this.start = timeslot.start;
  this.end = timeslot.end;
  this.capacity = timeslot.capacity;
  this.booking = timeslot.booking;
};

Timeslot.create = (newTimeslot, result) => {
  sql.query("INSERT INTO timeslot SET ?", newTimeslot, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created timeslot: ", { id: res.insertId, ...newTimeslot });
    result(null, { id: res.insertId, ...newTimeslot });
  });
};

Timeslot.findById = (timeslotId, result) => {
  sql.query(`SELECT * FROM timeslot WHERE id = ${timeslotId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found timeslot: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found timeslot with the id
    result({ kind: "not_found" }, null);
  });
};

Timeslot.getAll = result => {
  sql.query("SELECT * FROM timeslot", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("timeslots: ", res);
    result(null, res);
  });
};

Timeslot.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE timeslot SET start = ?, end = ?, capacity = ?, booking = ? WHERE id = ?",
    [timeslot.start, timeslot.end, timeslot.capacity, timeslot.booking, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found timeslot with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated timeslot: ", { id: id, ...timeslot });
      result(null, { id: id, ...timeslot });
    }
  );
};

Timeslot.remove = (id, result) => {
  sql.query("DELETE FROM timeslot WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found timeslot with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted timeslot with id: ", id);
    result(null, res);
  });
};

Timeslot.removeAll = result => {
  sql.query("DELETE FROM timeslot", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} timeslot`);
    result(null, res);
  });
};

module.exports = Timeslot;
