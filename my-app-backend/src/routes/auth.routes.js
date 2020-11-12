module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const VerifyToken = require('../middleware/verifyToken.js');

  // Register a new user
  app.post("/api/auth/register", auth.register);
  
  // Login
  app.post("/api/auth/login", auth.login);

  // Logout
  app.get("/api/auth/logout", auth.logout);

  // Retrieve current user's data
  app.get("/api/auth/me", VerifyToken, auth.me);

};
