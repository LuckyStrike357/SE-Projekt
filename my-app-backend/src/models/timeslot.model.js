module.exports = (sequelize, Sequelize) => {
    const Timeslot = sequelize.define("timeslots", {
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        }
    });

    return Timeslot;
};