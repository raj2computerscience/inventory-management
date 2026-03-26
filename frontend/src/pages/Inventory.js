import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { inventoryService } from '../services/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import InventoryTable from '../components/InventoryTable';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import InventoryForm from '../components/InventoryForm';
import { FiPlus, FiEdit2, FiSearch, FiFilter } from 'react-icons/fi';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceMake, setDeviceMake] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const { success, error } = useToast();
  const [searchParams] = useSearchParams();

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
    if (searchParams.get('add') === 'true') {
      setModalOpen(true);
    }
    const queryDeviceType = searchParams.get('deviceType');
    const queryDeviceMake = searchParams.get('deviceMake');
    if (queryDeviceType) setDeviceType(queryDeviceType);
    if (queryDeviceMake) setDeviceMake(queryDeviceMake);
  }, [searchParams]);

  useEffect(() => {
    fetchInventory();
  }, [page, search, deviceType, deviceMake]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getInventory(page, 10, search, deviceType, deviceMake);
      setInventory(response.data.inventory);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      error('Failed to load inventory');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInventory = async (formData) => {
    try {
      setFormLoading(true);
      if (selectedItem?.id) {
        await inventoryService.updateInventory(selectedItem.id, formData);
        success('Inventory updated successfully');
      } else {
        await inventoryService.createInventory(formData);
        success('Inventory added successfully');
      }
      setModalOpen(false);
      setSelectedItem(null);
      setPage(1);
      fetchInventory();
    } catch (err) {
      error(err.response?.data?.error || 'Failed to save inventory');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inventory item?')) return;

    try {
      await inventoryService.deleteInventory(id);
      success('Inventory deleted successfully');
      fetchInventory();
    } catch (err) {
      error('Failed to delete inventory');
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <Layout>
      <div className="bg-slate-100 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <button
              onClick={() => {
                setSelectedItem(null);
                setModalOpen(true);
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
            >
              <FiPlus /> Add New
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FiSearch size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, model, or serial number..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <FiFilter size={20} className="text-gray-400" />
                <select
                  value={deviceType}
                  onChange={(e) => {
                    setDeviceType(e.target.value);
                    setPage(1);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Device Types</option>
                  {deviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FiFilter size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by Make"
                  value={deviceMake}
                  onChange={(e) => {
                    setDeviceMake(e.target.value);
                    setPage(1);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <InventoryTable
              items={inventory}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              loading={loading}
            />
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        title={selectedItem?.id ? 'Edit Inventory' : 'Add New Inventory'}
        onClose={handleCloseModal}
        size="2xl"
      >
        <InventoryForm
          initialData={selectedItem}
          onSubmit={handleAddInventory}
          loading={formLoading}
        />
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={detailsModalOpen}
        title="Inventory Details"
        onClose={() => setDetailsModalOpen(false)}
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-4 bg-white rounded-lg border border-[#e95420] p-4 text-[#1a1a1a]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">S.No</label>
                <p className="font-semibold">{selectedItem.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">User Name</label>
                <p className="font-semibold">{selectedItem.userName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Device Type</label>
                <p className="font-semibold">{selectedItem.deviceType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Device Make</label>
                <p className="font-semibold">{selectedItem.deviceMake}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Device Model</label>
                <p className="font-semibold">{selectedItem.deviceModel}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Serial Number</label>
                <p className="font-mono font-semibold">{selectedItem.serialNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Operating System</label>
                <p className="font-semibold">{selectedItem.operatingSystem}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Processor</label>
                <p className="font-semibold">{selectedItem.processor}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">RAM</label>
                <p className="font-semibold">{selectedItem.ram}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Disk</label>
                <p className="font-semibold">{selectedItem.disk}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600">Remarks</label>
              <p className="font-semibold">{selectedItem.remarks || 'N/A'}</p>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Inventory;
