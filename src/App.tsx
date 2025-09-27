import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Plane as PlanePaper } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/Login/LoginPage';
import TopBar from './components/Layout/TopBar';
import QuotationForm from './components/QuotationForm';
import PDFPreview from './components/PDFPreview';
import { QuotationData } from './types';
import { defaultQuotationData } from './data/defaultData';

function MainApp() {
  const [quotationData, setQuotationData] = useState<QuotationData>(defaultQuotationData);

  const handleUpdateQuotation = (data: QuotationData) => {
    setQuotationData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar with user info and logout */}
      <TopBar />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PlanePaper size={28} className="text-teal-100" />
            <h1 className="text-xl font-bold">Tourism Quotation Maker</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Quotation Form */}
        <QuotationForm
          quotationData={quotationData}
          onUpdateQuotation={handleUpdateQuotation}
        />
        
        {/* PDF Preview Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              PDF Preview
            </h2>
            <p className="text-sm text-gray-600">
              Preview updates automatically when you save the form above
            </p>
          </div>
          <PDFPreview quotationData={quotationData} />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;