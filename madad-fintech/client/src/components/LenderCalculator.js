import React, { useState } from 'react';
import axios from 'axios';

export default function LenderCalculator() {
  const [application, setApplication] = useState({
    creditScore: 700,
    avgMonthlyTransactions: 100000,
    documents: [],
    bankStatement: false,
    auditedReport: false
  });

  const [offers, setOffers] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/lenders/calculate', application);
      setOffers(response.data);
    } catch (error) {
      console.error('Error calculating offers:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Form inputs */}
      <button 
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Calculate Best Offer
      </button>
      
      {/* Results display */}
      {offers.length > 0 && (
        <div className="mt-6 space-y-4">
          {offers.map((offer, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold">{offer.lender}</h3>
              <p>Credit Limit: QAR {offer.creditLimit.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}