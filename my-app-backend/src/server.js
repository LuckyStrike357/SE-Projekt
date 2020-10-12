import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


const app = express();
app.use(express.static(path.join(__dirname,'/build')));
app.use(bodyParser.json());
app.get('/hello', (req,res) =>res.send('Hello!'));
app.post('/hello', (req,res)=> res.send(`Hello ${req.body.name}!`));


const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "Admin",
  password: "admin123456",
  database: 'test'
});

/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM pet", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/

app.get('/testdb',(req,res) =>{
  con.query("SELECT * FROM pet", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });   
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM pet", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
      });
});*/
});

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8000, () => console.log('Listening on port 8000'));

