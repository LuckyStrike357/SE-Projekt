module.exports = app => {
  const timeslotbookings = require("../controllers/timeslotbooking.controller.js");

  // Create a new timeslotbooking
  app.post("/timeslotbookings", timeslotbookings.create);

  // Retrieve all timeslotbookings or filter by id or date range
  app.get('/timeslotbookings', async (req, res) => {

    let id = req.query.id;
    let start = req.query.start;
    let end = req.query.end;

    //retrieve all timeslotbookings
    if (id == undefined && start == undefined && end == undefined) {
      timeslotbookings.findAll(req, res)

      //retrieve single timeslotbooking by id
    } else if (id != undefined) {
      timeslotbookings.findById(req, res)

      //retrieve timeslotbooking(s) by date range
    } else if (start != undefined && end != undefined) {
      timeslotbookings.findByDate(req, res)

      //else throw error
    } else {
      res.status(404).send();
    }

  });

  // Update a timeslotbooking with timeslotbookingId
  app.put("/timeslotbookings/:timeslotbookingId", timeslotbookings.update);

  // Delete a timeslotbooking with timeslotbookingId
  app.delete("/timeslotbookings/:timeslotbookingId", timeslotbookings.delete);

  // Delete all timeslotbookings
  app.delete("/timeslotbookings", timeslotbookings.deleteAll);

};
