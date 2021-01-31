const Sequelize = require('sequelize');
const { name } = require('../package.json');
require("dotenv").config();

// Initialize database with Sequelize
// DB_NAME, added porotocol & dialectOptions, 
const db = new Sequelize(`${process.env.HEROKU_POSTGRESQL_PUCE_URL}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  protocol: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false
    }
  }
});

module.exports = db;
