const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Create database tables
db.visitor = require("./visitor.model")(sequelize, Sequelize);
db.booking = require("./booking.model")(sequelize, Sequelize);
db.timeslot = require("./timeslot.model")(sequelize, Sequelize); 
db.user = require("./user.model")(sequelize, Sequelize);


// Define Relationships

// Each booking has one visitor
db.visitor.hasOne(db.booking);
db.booking.belongsTo(db.visitor);

//Timeslot has many bookings but a booking has only one timeslot 
db.timeslot.hasMany(db.booking);
db.booking.belongsTo(db.timeslot);

module.exports = db;