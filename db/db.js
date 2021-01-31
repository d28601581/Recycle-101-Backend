const Sequelize = require('sequelize');
const { name } = require('../package.json');
require("dotenv").config();

// Initialize database with Sequelize
/* const db = new Sequelize(`${process.env.NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: true
  }
});
 */

// HEROKU_POSTGRESQL_PUCE_URL
const db = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false
    }
  }
});

module.exports = db;
