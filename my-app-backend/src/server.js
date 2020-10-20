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

app.get('/users', async (req, res) => {
  let conn;
  try {
      // establish a connection to MariaDB
      conn = await pool.getConnection();

      // create a new query
      var query = "select * from User";

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

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(port, () => console.log('Listening on port ' + port ));

