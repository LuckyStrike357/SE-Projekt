import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


const app = express();
app.use(express.static(path.join(__dirname,'/build')));
app.use(bodyParser.json());
app.get('/hello', (req,res) =>res.send('Hello!'));
app.post('/hello', (req,res)=> res.send(`Hello ${req.body.name}!`));

const pool = require('./db');
const port = 3000;

// expose an endpoint
app.get('/testdb', async (req, res) => {
  let conn;
  try {
      // establish a connection to MariaDB
      conn = await pool.getConnection();

      // create a new query
      var query = "select * from pet";

      // execute the query and set the result to a new variable
      var rows = await conn.query(query);

      // return the results
      res.send(rows);
      // res.status(200).send(rows);
  } catch (err) {
      throw err;
  } finally {
      if (conn) return conn.release();
  }
});

//const mysql = require('mysql');

/*
const con = mysql.createConnection({
  host: "localhost",
  user: "Admin",
  password: "admin123456",
  database: 'test'
});*/

/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM pet", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/


app.get('testdb', (req,res)=>{
  async function asyncFunction() {
    let conn;
    try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM pet");
    console.log(rows); //[ {val: 1}, meta: ... ]
    res.status(200).send(rows);
    } catch (err) {
    throw err;
    } finally {
    if (conn) return conn.end();
    }
  }
});
/*
app.get('/testdb',(req,res) =>{
  const con = pool.getConnection();
  con.query("SELECT * FROM pet", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });   */
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM pet", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
      });
});*/
//});

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(port, () => console.log('Listening on port ' + port ));

