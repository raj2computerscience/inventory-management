import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Debug: log user info to console to help diagnose issues
  React.useEffect(() => {
    console.log('Current user:', user);
    if (user) {
      console.log('User role:', user.role);
      console.log('Is admin?', user.role === 'admin');
    }
  }, [user]);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/import', label: 'Import CSV' },
  ];

  const adminLinks = [
    { path: '/admin/users', label: 'Manage Users' },
  ];

  const isActive = (path) => location.pathname === path ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-bold text-slate-900">
            Axim Inventory
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${isActive(link.path)}`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Links */}
            {user?.role?.toLowerCase() === 'admin' && (
              <div className="flex gap-4 pl-4 border-l">
                {adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`transition-colors ${isActive(link.path)}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 border-l pl-8">
              <span className="text-sm text-gray-600">{user?.username}</span>
              {user?.role === 'admin' && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded font-semibold">
                  Admin
                </span>
              )}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${isActive(link.path)}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Links Mobile */}
            {user?.role === 'admin' && (
              <div className="border-t pt-4 flex flex-col gap-2">
                <div className="text-xs text-gray-500 font-semibold uppercase">Administration</div>
                {adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`transition-colors ${isActive(link.path)}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
