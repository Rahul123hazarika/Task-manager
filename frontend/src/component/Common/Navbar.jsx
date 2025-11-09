import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setShowProfile(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setShowProfile(prev => !prev);

  return (
    <nav className="bg-white shadow-md">
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SA</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">
              ScalableApp
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium"
                  >
                    <FiUser />
                    <span>Profile</span>
                  </button>
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 p-4">
                      <p className="text-gray-700"><strong>Name:</strong> {user?.name}</p>
                      <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Side: Logout Button with Color */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="md:flex hidden btn btn-secondary ml-auto"
              title="Logout"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>

                {/* Mobile Profile Info */}
                <div className="px-4 py-2 border-t border-gray-200 mt-2 space-y-1">
                  <p className="text-gray-700"><strong>Name:</strong> {user?.name}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full btn btn-secondary text-center"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <div className="px-4 py-2 space-y-2">
                <Link to="/login" className="block btn btn-secondary text-center">
                  Login
                </Link>
                <Link to="/register" className="block btn btn-primary text-center">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
