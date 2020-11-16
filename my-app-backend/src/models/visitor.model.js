module.exports = (sequelize, Sequelize) => {
    const Visitor = sequelize.define("visitors", {
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

/*
this.email = visitor.email;
  this.first_name = visitor.first_name;
  this.last_name  = visitor.last_name;
  this.street = visitor.street;
  this.number = visitor.number;
  this.place = visitor.place;
  this.postal_code = visitor.postal_code;
  this.telephone = visitor.telephone;
  */