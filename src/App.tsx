import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Plane as PlanePaper } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
// Lazy load the LoginPage to reduce initial bundle size
const LoginPage = React.lazy(() => import("./components/Login/LoginPage"));
import TopBar from "./components/Layout/TopBar";
import PDFPreview from "./components/PDFPreview";

// Lazy load the QuotationForm to reduce initial bundle size
const QuotationForm = React.lazy(() => import("./components/QuotationForm"));
import { QuotationData } from "./types";
import { defaultQuotationData } from "./data/defaultData";

function MainApp() {
  const [quotationData, setQuotationData] =
    useState<QuotationData>(defaultQuotationData);

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
        <React.Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          }
        >
          <QuotationForm
            quotationData={quotationData}
            onUpdateQuotation={handleUpdateQuotation}
          />
        </React.Suspense>

        {/* PDF Preview Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">PDF Preview</h2>
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
          <Route
            path="/login"
            element={
              <React.Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">Loading...</div>
                  </div>
                }
              >
                <LoginPage />
              </React.Suspense>
            }
          />
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
