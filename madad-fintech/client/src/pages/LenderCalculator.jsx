import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { CheckIcon, XIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

const LenderCalculator = () => {
    const [msmeApplications, setMsmeApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchMsmeApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/msme');
        setMsmeApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch MSME applications');
        setLoading(false);
      }
    };

    fetchMsmeApplications();
  }, []);

  const handleCalculate = async (applicationId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/lender/calculate/${applicationId}`);
      if (response.data.length > 0) {
        setSelectedOffer({
          applicationId,
          bestOffer: response.data[0]
        });
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error('Calculation failed:', err);
      alert('Failed to calculate best lender');
    }
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    
    if (confirmed && selectedOffer) {
      try {
        setProcessing(true);
        
        const promise = axios.post('http://localhost:5000/api/lender/select-lender', {
          applicationId: selectedOffer.applicationId,
          lenderId: selectedOffer.bestOffer.lenderId
        });
  
        toast.promise(promise, {
          loading: 'Saving lender selection...',
          success: (res) => (
            <div className="flex items-center space-x-2">
              <span>Lender selection saved successfully!</span>
            </div>
          ),
          error: (err) => (
            <div className="flex items-center space-x-2">
              <span>Failed to save selection: {err.response?.data?.message || 'Server error'}</span>
            </div>
          )
        }, {
          style: {
            minWidth: '300px',
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        });
  
        await promise;
  
      } catch (err) {
        // Error is already handled by toast.promise
      } finally {
        setProcessing(false);
      }
    }
    
    setSelectedOffer(null);
  };

  return (
    
    <div className="container mx-auto mt-4 p-4">
        <Toaster
  position="top-right"
  gutter={8}
  toastOptions={{
    duration: 4000,
    success: {
      duration: 3000,
    },
    error: {
      duration: 5000,
    },
  }}
/>
        {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Best Lender</h3>
            <p className="mb-4">
              Do you want to select <b>{selectedOffer?.bestOffer.lenderName}</b> with a credit limit of {' '}
              <b> QAR {selectedOffer?.bestOffer.creditLimit?.toLocaleString()}?</b>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmation(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={processing}
              >
                {processing ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">MSME Applications</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank Statement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Audited Report
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {msmeApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {application.businessName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.businessType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {application.creditScore}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  QAR {application.avgMonthlyTransactions?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {application.documents.map(doc => (
                      <span 
                        key={doc}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.bankStatement ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XIcon className="h-5 w-5 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.auditedReport ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XIcon className="h-5 w-5 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex flex-col">
                    <span className="text-gray-600">{application.contactEmail}</span>
                    <span className="text-gray-500">{application.contactPhone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleCalculate(application.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                  >
                    Calculate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LenderCalculator;