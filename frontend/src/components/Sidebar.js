import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiList, FiUpload, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/inventory', label: 'Inventory', icon: FiList },
    { path: '/import', label: 'Import CSV', icon: FiUpload },
  ];

  const adminItems = [
    { path: '/admin/users', label: 'Manage Users', icon: FiUsers },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-slate-100 transition-all duration-300 ease-in-out flex flex-col fixed h-screen z-50 md:relative`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {sidebarOpen && <span className="text-xl font-bold">Axim</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded transition"
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Admin Section */}
          {user?.role?.toLowerCase() === 'admin' && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              {sidebarOpen && (
                <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
                  Administration
                </p>
              )}
              <div className="space-y-2">
                {adminItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        isActive(item.path)
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      title={!sidebarOpen ? item.label : ''}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-800 px-2 py-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800">
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.username}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            )}
            {user?.role === 'admin' && (
              <span className="text-xs bg-indigo-600 px-2 py-1 rounded whitespace-nowrap">
                Admin
              </span>
            )}
          </div>
          <button
            onClick={logout}
            className="w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition"
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <FiLogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
