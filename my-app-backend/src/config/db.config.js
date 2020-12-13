/**
 * Database settings
 */

module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "admin123456",
  DB: "visitor_tracker",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
