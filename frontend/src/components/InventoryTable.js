import React, { useState, useMemo } from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { formatDate, getDeviceTypeColor } from '../utils/helpers';

const InventoryTable = ({ items, onEdit, onDelete, onView, loading }) => {
  const [filters, setFilters] = useState({
    userName: '',
    deviceType: '',
    deviceMake: '',
    deviceModel: '',
    serialNumber: '',
    operatingSystem: '',
    ram: '',
    disk: '',
    createdAt: ''
  });

  const deviceTypes = [
    'Laptop',
    'PC',
    'MacBook',
    'Mac Mini',
    'Mobile/Tablet',
    'Network Device',
    'Other'
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return (
        (filters.userName === '' || item.userName.toLowerCase().includes(filters.userName.toLowerCase())) &&
        (filters.deviceType === '' || item.deviceType === filters.deviceType) &&
        (filters.deviceMake === '' || item.deviceMake.toLowerCase().includes(filters.deviceMake.toLowerCase())) &&
        (filters.deviceModel === '' || item.deviceModel.toLowerCase().includes(filters.deviceModel.toLowerCase())) &&
        (filters.serialNumber === '' || item.serialNumber.toLowerCase().includes(filters.serialNumber.toLowerCase())) &&
        (filters.operatingSystem === '' || item.operatingSystem.toLowerCase().includes(filters.operatingSystem.toLowerCase())) &&
        (filters.ram === '' || item.ram.toLowerCase().includes(filters.ram.toLowerCase())) &&
        (filters.disk === '' || item.disk.toLowerCase().includes(filters.disk.toLowerCase())) &&
        (filters.createdAt === '' || formatDate(item.createdAt).toLowerCase().includes(filters.createdAt.toLowerCase()))
      );
    });
  }, [items, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">No inventory items found</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="px-4 py-3 text-left text-sm font-semibold">S.No</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">User Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Device Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Device Make/Model</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Serial Number</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">OS</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">RAM</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Disk</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
          </tr>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter User Name"
                value={filters.userName}
                onChange={(e) => handleFilterChange('userName', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2">
              <select
                value={filters.deviceType}
                onChange={(e) => handleFilterChange('deviceType', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Types</option>
                {deviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter Make/Model"
                value={`${filters.deviceMake} ${filters.deviceModel}`.trim()}
                onChange={(e) => {
                  const value = e.target.value;
                  const parts = value.split(' ');
                  handleFilterChange('deviceMake', parts[0] || '');
                  handleFilterChange('deviceModel', parts.slice(1).join(' ') || '');
                }}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter Serial"
                value={filters.serialNumber}
                onChange={(e) => handleFilterChange('serialNumber', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter OS"
                value={filters.operatingSystem}
                onChange={(e) => handleFilterChange('operatingSystem', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter RAM"
                value={filters.ram}
                onChange={(e) => handleFilterChange('ram', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter Disk"
                value={filters.disk}
                onChange={(e) => handleFilterChange('disk', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2">
              <input
                type="text"
                placeholder="Filter Date"
                value={filters.createdAt}
                onChange={(e) => handleFilterChange('createdAt', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{index + 1}</td>
              <td className="px-4 py-3 text-sm">{item.userName}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDeviceTypeColor(item.deviceType)}`}>
                  {item.deviceType}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{item.deviceMake} {item.deviceModel}</td>
              <td className="px-4 py-3 text-sm font-mono">{item.serialNumber}</td>
              <td className="px-4 py-3 text-sm">{item.operatingSystem}</td>
              <td className="px-4 py-3 text-sm">{item.ram}</td>
              <td className="px-4 py-3 text-sm">{item.disk}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(item)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded transition"
                    title="View"
                  >
                    <FiEye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 text-yellow-500 hover:bg-yellow-50 rounded transition"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
