// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `C:/Users/GUESTMSH/AppData/Roaming/DBeaverData/workspace6/.metadata/sample-database-sqlite-1/Chinook.db`, // Path to SQLite database
  });
module.exports = sequelize;