import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield, User } from 'lucide-react';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-end items-center space-x-4">
      {/* User Role Display */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {user.role === 'admin' ? (
          <Shield size={16} className="text-teal-600" />
        ) : (
          <User size={16} className="text-blue-600" />
        )}
        <span className="font-medium">
          {user.role === 'admin' ? 'Admin' : 'Employee'}: {user.email}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default TopBar; 