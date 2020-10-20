const mariadb = require('mariadb');
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mariadb.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MariaDB connection
connection.getConnection(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;


/*
const mariadb = require('mariadb');
const pool = mariadb.createPool(
  {
    host: "localhost",
    user: "admin",
    password: "admin123456",
    database: 'test_db'
  }
);

// expose the ability to create new connections
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }

*/
