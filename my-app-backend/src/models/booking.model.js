module.exports = (sequelize, Sequelize) => {

    // Only id, foreign keys are added in index.js
    const Booking = sequelize.define("bookings", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        scanned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Booking;
};