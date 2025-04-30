const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MsmeApplication = sequelize.define('MsmeApplication', {
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  businessType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  businessAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 15],
      notEmpty: true
    }
  },
  creditScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 800
    }
  },
  avgMonthlyTransactions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  documents: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('documents'));
    },
    set(value) {
      this.setDataValue('documents', JSON.stringify(value));
    },
    validate: {
      hasCR(document) {
        if (!JSON.parse(document).includes('CR')) {
          throw new Error('CR document is mandatory');
        }
      }
    }
  },
  bankStatement: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  auditedReport: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  selectedLenderId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  selectedCreditLimit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  selectionDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
});



module.exports = { MsmeApplication };