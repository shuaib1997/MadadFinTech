const express = require('express');
const router = express.Router();
const { MsmeApplication } = require('../model/MsmeApplication'); // Sequelize model

// Create MSME application
router.post('/', async (req, res) => {
  try {
    console.log('req.body',req.body)
    const application = await MsmeApplication.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    console.error('Error creating MSME application:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get all MSME applications
router.get('/', async (req, res) => {
  try {
    const applications = await MsmeApplication.findAll();
    res.json(applications);
  } catch (err) {
    console.error('Error fetching MSME applications:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
