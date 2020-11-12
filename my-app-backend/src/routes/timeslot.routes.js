module.exports = app => {
  const timeslots = require("../controllers/timeslot.controller.js");
  const VerifyToken = require('../middleware/verifyToken.js');
  
  // Create a new timeslot
  app.post("/timeslots", timeslots.create);

  // Retrieve all timeslots or filter by id or date range
  app.get('/timeslots', async (req, res) => {

    let id = req.query.id;
    let start = req.query.start;
    let end = req.query.end;

    //retrieve all timeslots
    if (id == undefined && start == undefined && end == undefined) {
      timeslots.findAll(req, res)

      //retrieve single timeslot by id
    } else if (id != undefined) {
      timeslots.findById(req, res)

      //retrieve timeslot(s) by date range
    } else if (start != undefined && end != undefined) {
      timeslots.findByDate(req, res)

      //else throw error
    } else {
      res.status(404).send();
    }

  });

  // Update a timeslot with timeslotId
  app.put("/timeslots/:timeslotId", VerifyToken, timeslots.update);

  // Delete a timeslot with timeslotId
  app.delete("/timeslots/:timeslotId", VerifyToken, timeslots.delete);

  // Delete all timeslots
  app.delete("/timeslots", VerifyToken, timeslots.deleteAll);

};
