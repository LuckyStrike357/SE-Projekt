module.exports = (sequelize, Sequelize) => {

    // Only id, foreign keys are added in index.js
    const Booking = sequelize.define("bookings", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    return Booking;
};