//NODE MODULES
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const session = require("express-session");
const passport = require("passport");

//IMPORTS/VARIABLES
const PORT = process.env.PORT || 5432;

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
//const seed = require('./seed');

const app = express();
app.use(express.json())
app.use(express.urlencoded())


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});
//CORS!
app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }))


app.use(
  session({
    secret: "a super secretive secret key string to encrypt and sign the cookie",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());


//Mount on API
app.use('/api', require('./api'));

//START BACKEND SERVER FUNCTIOON
// const serverRun = () => {
//   const server = app.listen(PORT, () => {
//     console.log(`Live on port : ${PORT}`);
//   });
// };
//DB Sync Function
// const syncDb = () => {
//   if (process.env.NODE_ENV === 'production') {
//     db.sync();
//   }
//   else {
//     console.log('As a reminder, the forced synchronization option is on');
//     db.sync()
//       .then(() => seed())
//       .catch(err => {
//         if (err.name === 'SequelizeConnectionError') {
//           createLocalDatabase();
//           seed();
//         }
//         else {
//           console.log(err);
//         }
//       });
//     }
// };
// //Optional parameters
// {force:true} - drops current tables and places new empty tables
//{alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

 const syncDb = () => db.sync();
// Connects to //postgres://localhost:5432/dbname

//Run server and sync DB

sessionStore.sync();
syncDb();

app.listen(PORT, () => {
  console.log(`Live on port : ${PORT}`);
})


module.exports = app;
