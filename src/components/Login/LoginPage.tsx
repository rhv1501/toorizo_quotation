import React, { useState, useEffect } from 'react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plane as PlanePaper, User, Shield } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserRole>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    const success = login(email, password, activeTab);
    
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError(`${activeTab === 'admin' ? 'Admin' : 'Employee'} Details mismatch`);
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleTabChange = (role: UserRole) => {
    setActiveTab(role);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <PlanePaper size={48} className="text-teal-100" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Tourism Quotation Maker</h1>
          <p className="text-teal-100">Sign in to your account</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'admin'
                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleTabChange('admin')}
          >
            <div className="flex items-center justify-center space-x-2">
              <Shield size={18} />
              <span>Admin Login</span>
            </div>
          </button>
          <button
            type="button"
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'employee'
                ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleTabChange('employee')}
          >
            <div className="flex items-center justify-center space-x-2">
              <User size={18} />
              <span>Employee Login</span>
            </div>
          </button>
        </div>

        {/* Login Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder={`Enter your ${activeTab} email`}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : `Sign in as ${activeTab === 'admin' ? 'Admin' : 'Employee'}`}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {activeTab === 'admin' ? 'Admin access provides full system privileges' : 'Employee access with limited privileges'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 