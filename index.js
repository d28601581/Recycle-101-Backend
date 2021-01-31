//NODE MODULES
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

//IMPORTS/VARIABLES
const PORT = process.env.PORT || 8080;
const db = require('./db');
const createLocalDatabase = require('./createLocalDatabase');
const seed = require('./seed');

const app = express();

//CORS!
app.use(cors());

//Mount on API
app.use('/api', require('./api'));

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

//START BACKEND SERVER FUNCTIOON
const serverRun = () => {
  const server = app.listen(PORT, () => {
    console.log(`Live on port : ${PORT}`);
  });
};
//DB Sync Function
const syncDb = () => {
  if (process.env.NODE_ENV === 'production') {
    db.sync();
  }
  else {
    console.log('As a reminder, the forced synchronization option is on');
    db.sync({ force: true })
      .then(() => seed())
      .catch(err => {
        if (err.name === 'SequelizeConnectionError') {
          createLocalDatabase();
          seed();
        }
        else {
          console.log(err);
        }
      });
    }
};
//Optional parameters
// {force:true} - drops current tables and places new empty tables
//{alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

// const syncDb = () => db.sync();
// Connects to //postgres://localhost:5432/dbname

//Run server and sync DB
syncDb();
serverRun();

module.exports = app;
