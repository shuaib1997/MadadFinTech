const express = require('express');
const router = express.Router();
const { LenderProgram } = require('../model/LenderProgram'); // Sequelize model
const { MsmeApplication } = require('../model/MsmeApplication'); 

// Create lender program
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const program = await LenderProgram.create(req.body);
    res.status(201).json(program);
  } catch (err) {
    console.error('Error creating lender program:', err);
    res.status(400).json({ message: err.message });
  }
});

// Calculate best lender for application ID
router.post('/calculate/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;
    
    // Fetch MSME application
    const msmeApplication = await MsmeApplication.findByPk(applicationId);
    if (!msmeApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Get all lender programs
    const lenders = await LenderProgram.findAll();

    // Calculate offers
    const offers = lenders.map(lender => ({
      lenderId: lender.id,
      lenderName: lender.name,
      creditLimit: calculateOffer(msmeApplication, lender),
      terms: {
        creditScoreThreshold: lender.creditScoreThreshold,
        documentRequirements: lender.documentMultipliers
      }
    }));

    // Sort offers by credit limit descending
    const sortedOffers = offers.sort((a, b) => b.creditLimit - a.creditLimit);
    
    res.json(sortedOffers);

  } catch (err) {
    console.error('Error calculating offers:', err);
    res.status(500).json({ message: err.message });
  }
});

// Enhanced calculation logic
function calculateOffer(msme, lender) {
  // Base calculation using credit score multiplier
  const creditMultiplier = msme.creditScore >= lender.creditScoreThreshold
    ? lender.creditScoreMultipliers.high
    : lender.creditScoreMultipliers.low;

  // Document multiplier calculation
  const documentCount = msme.documents.length;
  let docMultiplier = lender.documentMultipliers.onlyCR;
  
  if (documentCount >= 4) {
    docMultiplier = lender.documentMultipliers.all4;
  } else if (documentCount === 3) {
    docMultiplier = lender.documentMultipliers.three;
  } else if (documentCount === 2) {
    docMultiplier = lender.documentMultipliers.two;
  }

  // Additional multipliers
  const bankMultiplier = msme.bankStatement ? lender.bankStatementMultiplier : 1;
  const auditMultiplier = msme.auditedReport ? lender.auditedReportMultiplier : 1;

  // Final calculation
  return Math.round(
    msme.avgMonthlyTransactions * 
    creditMultiplier *
    docMultiplier *
    bankMultiplier *
    auditMultiplier
  );
}

// New endpoint to store lender selection
router.post('/select-lender', async (req, res) => {
  try {
    const { applicationId, lenderId } = req.body;

    // Validate application
    const application = await MsmeApplication.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Validate lender
    const lender = await LenderProgram.findByPk(lenderId);
    if (!lender) {
      return res.status(404).json({ message: 'Lender program not found' });
    }

    // Recalculate to verify credit limit
    const creditLimit = calculateOffer(application, lender);

    // Update application with selection
    await application.update({
      selectedLenderId: lenderId,
      selectedCreditLimit: creditLimit,
      selectionDate: new Date()
    });

    res.json({ 
      success: true,
      message: 'Lender selection recorded successfully',
      selectedLender: lender.name,
      creditLimit
    });

  } catch (err) {
    console.error('Error selecting lender:', err);
    res.status(500).json({ message: 'Failed to record lender selection' });
  }
});
module.exports = router;
