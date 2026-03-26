import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryService } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      error('Failed to load dashboard statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#1e40af', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            onClick={() => navigate('/dashboard/details')}
            title="View all device details"
          >
            <div className="text-gray-600 text-sm mb-2">Total Devices</div>
            <div className="text-4xl font-bold text-primary">{stats?.totalDevices || 0}</div>
            <div className="text-xs text-gray-500 mt-1">Click to view full details</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-2">Device Types</div>
            <div className="text-4xl font-bold text-purple-600">{stats?.devicesByType?.length || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-2">Operating Systems</div>
            <div className="text-4xl font-bold text-green-600">{stats?.osDistribution?.length || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm mb-2">Device Makes</div>
            <div className="text-4xl font-bold text-orange-600">{stats?.deviceMakes?.length || 0}</div>
            <div className="text-gray-500 text-sm">Total devices: {stats?.deviceMakeTotal || 0}</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Devices by Type Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Devices by Type</h2>
            {stats?.devicesByType && stats.devicesByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.devicesByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-500">No data available</div>
            )}
          </div>

          {/* OS Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">OS Distribution</h2>
            {stats?.osDistribution && stats.osDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.osDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ os, count }) => `${os}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.osDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-500">No data available</div>
            )}
          </div>
        </div>

        {/* Device Makes Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Makewise (All Devices)</h2>
          {stats?.deviceMakes && stats.deviceMakes.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats.deviceMakes} margin={{ top: 10, right: 30, left: 0, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="make" angle={-45} textAnchor="end" interval={0} height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-500">No data available</div>
          )}
        </div>

        {/* Device Makes Table */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Device Makes Breakdown</h2>
          {stats?.deviceMakes && stats.deviceMakes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Make</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.deviceMakes.map((item) => (
                    <tr
                      key={item.make}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/inventory?deviceMake=${encodeURIComponent(item.make)}`)}
                      title={`Filter inventory by ${item.make}`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-800">{item.make}</td>
                      <td className="px-4 py-2 text-sm text-right text-gray-800">{item.count}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="px-4 py-2 text-sm text-gray-900">Total</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-900">{stats?.deviceMakeTotal || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500">No device make data available</div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/inventory?add=true')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-medium"
            >
              Add New Device
            </button>
            <button
              onClick={() => navigate('/import')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Import CSV
            </button>
            <button
              onClick={async () => {
                try {
                  const response = await inventoryService.exportCSV();
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'inventory_export.csv');
                  document.body.appendChild(link);
                  link.click();
                  link.parentNode.removeChild(link);
                  success('Inventory exported successfully');
                } catch (err) {
                  error('Failed to export inventory');
                }
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Export CSV
            </button>
          </div>

          {user?.role === 'admin' && (
            <div className="mt-4">
              <button
                onClick={() => navigate('/admin/users')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Manage Users
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
