require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const app = express();


// Test the connection
sequelize.authenticate()
  .then(() => console.log('SQLite connected'))
  .catch(err => {
    console.error('SQLite connection error:', err.message);
    console.error('Full Error:', err);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/msme', require('./routes/msme'));
app.use('/api/lender', require('./routes/lender'));

// Sync Sequelize models
sequelize.sync({ force: false }) // Set to true to drop and recreate tables every time
  .then(() => console.log('Sequelize sync complete'))
  .catch((err) => console.error('Sequelize sync error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = sequelize; // Export Sequelize instance for other files
