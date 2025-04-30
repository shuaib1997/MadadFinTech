import React, { useState } from 'react';
import axios from 'axios';

export default function MsmePortal() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Retail',
    businessAddress: '',
    contactEmail: '',
    contactPhone: '',
    creditScore: 0,
    avgMonthlyTransactions: 0,
    documents: [],
    bankStatement: false,
    auditedReport: false
  });
  const [submissionStatus, setSubmissionStatus] = useState({
    success: null,
    message: ''
  });

  const businessTypes = [
    'Retail', 'Wholesale', 'Manufacturing', 
    'Service', 'Agriculture', 'Technology','Others'
  ];

  const documentOptions = [
    { id: 'CR', label: 'Commercial Registration (CR) - Mandatory' },
    { id: 'TradeLicense', label: 'Trade License' },
    { id: 'TaxCard', label: 'Tax Card' },
    { id: 'EstdCertificate', label: 'Establishment Certificate' }
  ];

  const handleDocumentChange = (documentId) => {
    setFormData(prev => {
      const documents = prev.documents.includes(documentId)
        ? prev.documents.filter(doc => doc !== documentId)
        : [...prev.documents, documentId];
      return { ...prev, documents };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ success: null, message: '' });

    // Frontend validation
    if (!formData.documents.includes('CR')) {
      setSubmissionStatus({ success: false, message: 'Commercial Registration (CR) is mandatory' });
      return;
    }

    if (formData.creditScore < 0 || formData.creditScore > 800) {
      setSubmissionStatus({ success: false, message: 'Credit score must be between 0-800' });
      return;
    }

    try {
      console.log(formData);
      await axios.post('http://localhost:5000/api/msme', {
        ...formData,
        bankStatement: !!formData.bankStatement,
        auditedReport: !!formData.auditedReport
      });
      
      setSubmissionStatus({ 
        success: true, 
        message: 'Application submitted successfully! Our team will review your documents.' 
      });
      
      // Reset form (keep CR selected)
      setFormData({
        businessName: '',
        businessType: 'Retail',
        businessAddress: '',
        contactEmail: '',
        contactPhone: '',
        creditScore: 0,
        avgMonthlyTransactions: 0,
        documents: [],
        bankStatement: false,
        auditedReport: false
      });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus({ 
        success: false, 
        message: error.response?.data?.message || 'Submission failed. Please try again.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 border border-white/20">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Business Financing Application
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Get working capital against your invoices in 3 simple steps
            </p>
          </div>

          {/* Status Message */}
          {submissionStatus.message && (
            <div className={`mb-8 p-4 rounded-xl ${
              submissionStatus.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                <div className={`shrink-0 h-6 w-6 rounded-full ${
                  submissionStatus.success 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                } flex items-center justify-center mr-3`}>
                  {submissionStatus.success ? '✓' : '!'}
                </div>
                <span className="text-sm">{submissionStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Business Information
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Business Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={e => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Business Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.businessType}
                  onChange={e => setFormData({...formData, businessType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                >
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Business Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessAddress}
                  onChange={e => setFormData({...formData, businessAddress: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Contact Email
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Contact Phone
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.contactPhone}
                    onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                  />
                </div>
              </div>
            </div>
            {/* Credit Score */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Credit Score
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="800"
                  required
                  value={formData.creditScore}
                  onChange={e => setFormData({...formData, creditScore: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                />
                
              </div>
            </div>

            {/* Monthly Transactions */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Average Monthly Transactions (QAR)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.avgMonthlyTransactions}
                  onChange={e => setFormData({...formData, avgMonthlyTransactions: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
                />
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <fieldset className="space-y-4 p-6 bg-gray-50/50 rounded-xl border border-gray-200">
                <legend className="px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Required Documents
                </legend>
                
                {documentOptions.map((doc) => (
                  <div 
                    key={doc.id}
                    className={`flex items-center p-3 rounded-lg ${
                      formData.documents.includes(doc.id)
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-white hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <input
                      type="checkbox"
                      id={doc.id}
                      checked={formData.documents.includes(doc.id)}
                      onChange={() => handleDocumentChange(doc.id)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={doc.id} className="ml-3 text-sm font-medium text-gray-700">
                      {doc.label}
                      {doc.id === 'CR' && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>

            {/* Additional Documents */}
            <div className="space-y-4">
              <div className="flex items-center p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="bankStatement"
                  checked={formData.bankStatement}
                  onChange={e => setFormData({...formData, bankStatement: e.target.checked})}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="bankStatement" className="ml-3 text-sm font-medium text-gray-700">
                  Bank Statements (Optional)
                </label>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  id="auditedReport"
                  checked={formData.auditedReport}
                  onChange={e => setFormData({...formData, auditedReport: e.target.checked})}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="auditedReport" className="ml-3 text-sm font-medium text-gray-700">
                  Audited Financial Reports (Optional)
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:scale-[1.02]"
            >
              Submit Application
              <span className="ml-2">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}