const sql = require("./db.js");

// constructor
const Visitor = function(visitor) {
  this.email = visitor.email;
  this.first_name = visitor.first_name;
  this.last_name  = visitor.last_name;
  this.street = visitor.street;
  this.number = visitor.number;
  this.place = visitor.place;
  this.postal_code = visitor.postal_code;
  this.telephone = visitor.telephone;
};

Visitor.create = (newVisitor, result) => {
  sql.query("INSERT INTO visitor SET ?", newVisitor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created visitor: ", { id: res.insertId, ...newVisitor });
    result(null, { id: res.insertId, ...newVisitor });
  });
};

Visitor.findById = (visitorId, result) => {
  sql.query(`SELECT * FROM visitor WHERE id = ${visitorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found visitor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found visitor with the id
    result({ kind: "not_found" }, null);
  });
};

Visitor.getAll = result => {
  sql.query("SELECT * FROM visitor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("visitors: ", res);
    result(null, res);
  });
};

Visitor.updateById = (id, visitor, result) => {
  sql.query(
    "UPDATE visitor SET email = ?, first_name = ?, last_name = ?, street = ?, number = ?, place = ?, postal_code = ?, telephone = ? WHERE id = ?",
    [visitor.email, visitor.first_name, visitor.last_name, visitor.street, visitor.number, visitor.place, visitor.postal_code, visitor.telephone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found visitor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated visitor: ", { id: id, ...visitor });
      result(null, { id: id, ...visitor });
    }
  );
};

Visitor.remove = (id, result) => {
  sql.query("DELETE FROM visitor WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found visitor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted visitor with id: ", id);
    result(null, res);
  });
};

Visitor.removeAll = result => {
  sql.query("DELETE FROM visitor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} visitor`);
    result(null, res);
  });
};

module.exports = Visitor;
