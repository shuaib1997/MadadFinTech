const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LenderProgram = sequelize.define('LenderProgram', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creditScoreThreshold: {  // Changed from minCreditScore
    type: DataTypes.INTEGER,
    allowNull: false
  },
  creditScoreMultipliers: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { high: 1.5, low: 1 }
  },
  documentMultipliers: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { all4: 1.2, three: 1.1, two: 1.05, onlyCR: 1 }
  },
  bankStatementMultiplier: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1.2
  },
  auditedReportMultiplier: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1.5
  }
});

module.exports = { LenderProgram };