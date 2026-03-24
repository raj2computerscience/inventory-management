import React, { useState, useEffect } from 'react';

const InventoryForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    userName: '',
    deviceType: 'Laptop',
    deviceMake: '',
    deviceModel: '',
    serialNumber: '',
    operatingSystem: '',
    processor: '',
    ram: '',
    disk: '',
    remarks: ''
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Name *
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter user name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Device Type *
          </label>
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Device Make
          </label>
          <input
            type="text"
            name="deviceMake"
            value={formData.deviceMake}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Dell, HP, Apple"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Device Model
          </label>
          <input
            type="text"
            name="deviceModel"
            value={formData.deviceModel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., XPS 13, ProBook"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Serial Number *
          </label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Unique serial number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operating System
          </label>
          <input
            type="text"
            name="operatingSystem"
            value={formData.operatingSystem}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Windows 11, macOS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Processor
          </label>
          <input
            type="text"
            name="processor"
            value={formData.processor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Intel Core i7"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RAM
          </label>
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 16GB"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disk
          </label>
          <input
            type="text"
            name="disk"
            value={formData.disk}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 512GB SSD"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Remarks
        </label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows="3"
          placeholder="Additional remarks or notes"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Saving...' : initialData?.id ? 'Update Inventory' : 'Add Inventory'}
      </button>
    </form>
  );
};

export default InventoryForm;
