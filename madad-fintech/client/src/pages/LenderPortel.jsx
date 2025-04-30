import React, { useState } from 'react';
import axios from 'axios';
import LenderCalculator from '../components/LenderCalculator';

export default function LenderPortal() {
  const [programForm, setProgramForm] = useState({
    name: '',
    creditScoreThreshold: 700,
    creditScoreMultipliers: { high: 1.5, low: 1 },
    documentMultipliers: { all4: 1.2, three: 1.1, two: 1.05, onlyCR: 1 },
    bankStatementMultiplier: 1.2,
    auditedReportMultiplier: 1.5
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/lenders', programForm);
      setSuccessMessage('Lender program created successfully!');
      setErrorMessage('');
      // Reset form
      setProgramForm({
        name: '',
        creditScoreThreshold: 700,
        creditScoreMultipliers: { high: 1.5, low: 1 },
        documentMultipliers: { all4: 1.2, three: 1.1, two: 1.05, onlyCR: 1 },
        bankStatementMultiplier: 1.2,
        auditedReportMultiplier: 1.5
      });
    } catch (error) {
      setErrorMessage('Failed to create lender program');
      setSuccessMessage('');
      console.error('Error creating program:', error);
    }
  };

  const handleInputChange = (path, value) => {
    setProgramForm(prev => ({
      ...prev,
      [path]: value
    }));
  };

  const handleNestedChange = (parent, child, value) => {
    setProgramForm(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: parseFloat(value)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 border border-white/20 space-y-10">
          {/* Program Creation Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Lender Program Configuration
              </h2>
              <p className="mt-2 text-gray-600">Define your credit assessment parameters</p>
            </div>

            {/* Status Messages */}
            {successMessage && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="text-sm">{successMessage}</span>
                </div>
              </div>
            )}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center mr-3">
                    !
                  </div>
                  <span className="text-sm">{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleProgramSubmit} className="space-y-8">
              {/* Program Name and Threshold */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase">
                    Program Name
                  </label>
                  <input
                    type="text"
                    required
                    value={programForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter program name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase">
                    Credit Score Threshold
                  </label>
                  <input
                    type="number"
                    required
                    value={programForm.creditScoreThreshold}
                    onChange={(e) => handleInputChange('creditScoreThreshold', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter threshold score"
                  />
                </div>
              </div>

              {/* Credit Score Multipliers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase">
                    High Score Multiplier (≥ Threshold)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={programForm.creditScoreMultipliers.high}
                    onChange={(e) => handleNestedChange('creditScoreMultipliers', 'high', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="1.0 - 2.0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase">
                    Low Score Multiplier (≤ Threshold)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={programForm.creditScoreMultipliers.low}
                    onChange={(e) => handleNestedChange('creditScoreMultipliers', 'low', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="0.5 - 1.0"
                  />
                </div>
              </div>

              {/* Document Multipliers */}
              <div className="space-y-6 p-6 bg-gray-50/50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Document Multipliers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'All 4 Documents', key: 'all4' },
                    { label: '3 Documents', key: 'three' },
                    { label: '2 Documents', key: 'two' },
                    { label: 'Only CR Document', key: 'onlyCR' },
                  ].map((doc) => (
                    <div key={doc.key} className="space-y-2">
                      <label className="block text-sm text-gray-700">
                        {doc.label}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={programForm.documentMultipliers[doc.key]}
                        onChange={(e) => handleNestedChange('documentMultipliers', doc.key, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="Multiplier value"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Multipliers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase">
                    Bank Statement Multiplier
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={programForm.bankStatementMultiplier}
                    onChange={(e) => handleInputChange('bankStatementMultiplier', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="1.0 - 2.0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase">
                    Audited Report Multiplier
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={programForm.auditedReportMultiplier}
                    onChange={(e) => handleInputChange('auditedReportMultiplier', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="1.0 - 2.0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:scale-[1.02]"
              >
                Create Lender Program
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}