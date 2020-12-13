/**
 * Timeslot model
 */

module.exports = (sequelize, Sequelize) => {
    const Timeslot = sequelize.define("timeslots", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        },
        capacity: {
            type: Sequelize.INTEGER
        }
    });

    return Timeslot;
};