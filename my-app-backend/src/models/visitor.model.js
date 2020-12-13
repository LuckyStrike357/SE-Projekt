/**
 * Visitor model
 */

module.exports = (sequelize, Sequelize) => {
    const Visitor = sequelize.define("visitors", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        email: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        street: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.INTEGER
        },
        telephone: {
            type: Sequelize.STRING
        }
    });

    return Visitor;
};