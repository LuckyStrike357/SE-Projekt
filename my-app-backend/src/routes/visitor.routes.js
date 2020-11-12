module.exports = app => {
  const visitors = require("../controllers/visitor.controller.js");
  const VerifyToken = require('../middleware/verifyToken.js');

  // Create a new visitor
  app.post("/visitors", visitors.create);

  // Retrieve all visitor
  app.get("/visitors", VerifyToken, visitors.findAll);

  // Retrieve a single visitor with visitorId
  app.get("/visitors/:visitorId", VerifyToken, visitors.findOne);

  // Update a visitor with visitorId
  app.put("/visitors/:visitorId", VerifyToken, visitors.update);

  // Delete a visitor with visitorId
  app.delete("/visitors/:visitorId", VerifyToken, visitors.delete);

  // Delete all visitors
  app.delete("/visitors", VerifyToken, visitors.deleteAll);
};
