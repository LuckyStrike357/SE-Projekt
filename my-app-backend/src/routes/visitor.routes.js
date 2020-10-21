module.exports = app => {
  const visitors = require("../controllers/visitor.controller.js");

  // Create a new visitor
  app.post("/visitors", visitors.create);

  // Retrieve all visitor
  app.get("/visitors", visitors.findAll);

  // Retrieve a single visitor with visitorId
  app.get("/visitors/:visitorId", visitors.findOne);

  // Update a visitor with visitorId
  app.put("/visitors/:visitorId", visitors.update);

  // Delete a visitor with visitorId
  app.delete("/visitors/:visitorId", visitors.delete);

  // Delete all visitors
  app.delete("/visitors", visitors.deleteAll);
};
