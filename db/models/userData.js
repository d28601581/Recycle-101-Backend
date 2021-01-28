const Sequelize = require('sequelize');
const db = require('../db');

//Sample Model  Read More At https://sequelize.org/master/manual/model-basics.html

const UserData = db.define('userData', {
  
  total:{
    type: Sequelize.INTEGER,
    
  }

});

module.exports = UserData;
