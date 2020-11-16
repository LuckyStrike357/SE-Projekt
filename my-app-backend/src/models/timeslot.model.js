module.exports = (sequelize, Sequelize) => {
    const Timeslot = sequelize.define("timeslots", {
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