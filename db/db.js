const Sequelize = require('sequelize');
const { name } = require('../package.json');
require("dotenv").config();

// Initialize database with Sequelize
const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: true
});

module.exports = db;
