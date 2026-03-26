import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryService } from '../services/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

const DashboardDetails = () => {
  const [stats, setStats] = useState(null);
  const [allInventory, setAllInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [statsResponse, inventoryResponse] = await Promise.all([
          inventoryService.getDashboardStats(),
          inventoryService.getInventory(1, 100, '', '', '')
        ]);
        setStats(statsResponse.data);
        setAllInventory(inventoryResponse.data.inventory);
      } catch (err) {
        error('Failed to load details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Total Device Details</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Device Types</h2>
              <ul className="space-y-2">
                {stats?.devicesByType?.map((item) => (
                  <li
                    key={item.type}
                    className="cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/inventory?deviceType=${encodeURIComponent(item.type)}`)}
                  >
                    {item.type} ({item.count})
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Operating Systems</h2>
              <ul className="space-y-2">
                {stats?.osDistribution?.map((item) => (
                  <li key={item.os}>
                    {item.os || 'Unknown'} ({item.count})
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Device Makes</h2>
              <ul className="space-y-2">
                {stats?.deviceMakes?.map((item) => (
                  <li
                    key={item.make}
                    className="cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/inventory?deviceMake=${encodeURIComponent(item.make)}`)}
                  >
                    {item.make} ({item.count})
                  </li>
                ))}
                <li className="font-semibold">Total: {stats?.deviceMakeTotal || 0}</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">All Device Entries (first 100)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allInventory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.id}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.userName}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.deviceType}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.deviceMake}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.deviceModel}</td>
                      <td className="px-3 py-2 text-sm text-gray-700">{item.operatingSystem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardDetails;
