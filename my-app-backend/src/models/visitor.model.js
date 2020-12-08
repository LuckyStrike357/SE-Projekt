module.exports = (sequelize, Sequelize) => {
    const Visitor = sequelize.define("visitors", {
                
        email: {
            type: Sequelize.STRING,
            unique: true
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