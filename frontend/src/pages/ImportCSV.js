import React, { useState } from 'react';
import { inventoryService } from '../services/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import { FiUpload } from 'react-icons/fi';

const ImportCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const { success, error } = useToast();

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== 'text/csv' && !selected.name.endsWith('.csv')) {
        error('Please select a valid CSV file');
        return;
      }
      setFile(selected);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      error('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const response = await inventoryService.importCSV(file);
      setImportResult(response.data);
      success('CSV file imported successfully');
      setFile(null);
    } catch (err) {
      error(err.response?.data?.error || 'Failed to import CSV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Import Inventory from CSV</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FiUpload size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your CSV file here or click to select
                  </p>

                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition">
                      Select CSV File
                    </span>
                  </label>

                  {file && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <p className="text-green-800 font-semibold">✓ {file.name}</p>
                      <p className="text-green-700 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleImport}
                  disabled={!file || loading}
                  className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Importing...' : 'Import CSV'}
                </button>

                {/* CSV Format Guide */}
                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">CSV Format Guide</h4>
                  <p className="text-blue-800 text-sm mb-3">
                    Your CSV file should have the following columns:
                  </p>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• User Name (required)</li>
                    <li>• Device Type (required) - Laptop, PC, MacBook, Mac Mini, Mobile/Tablet, Network Device, Other</li>
                    <li>• Device Make/Model (e.g., Dell/XPS 13)</li>
                    <li>• Serial Number (required, must be unique)</li>
                    <li>• Operating System</li>
                    <li>• Processor</li>
                    <li>• RAM</li>
                    <li>• Disk</li>
                    <li>• Remarks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {importResult && (
              <div className="bg-white p-6 rounded-lg shadow h-fit">
                <h3 className="text-lg font-semibold mb-4">Import Results</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">Total Records</p>
                    <p className="text-2xl font-bold text-blue-600">{importResult.totalRecords}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Successful</p>
                    <p className="text-2xl font-bold text-green-600">{importResult.successCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{importResult.failureCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Duplicates</p>
                    <p className="text-2xl font-bold text-yellow-600">{importResult.duplicates}</p>
                  </div>
                </div>

                {importResult.duplicateSerials && importResult.duplicateSerials.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded">
                    <p className="text-yellow-900 text-sm font-semibold mb-2">Duplicate Serial Numbers:</p>
                    <ul className="text-yellow-800 text-xs space-y-1 max-h-32 overflow-y-auto">
                      {importResult.duplicateSerials.map((serial, idx) => (
                        <li key={idx}>• {serial}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportCSV;
