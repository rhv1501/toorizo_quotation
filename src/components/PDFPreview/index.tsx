import React, { Suspense } from "react";
import { QuotationData } from "../../types";
import { format } from "date-fns";
// Download icon will be used in the lazy-loaded PDF controls
// Lazy-load the PDF controls (PDFDocument + react-pdf) to keep the main bundle small.
const LazyPDFControls = React.lazy(() => import("./LazyPDFControls"));

interface PDFPreviewProps {
  quotationData: QuotationData;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ quotationData }) => {
  const fileName = `${quotationData.clientDetails.packageName.replace(
    /\s+/g,
    "_"
  )}_Quotation.pdf`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5 bg-blue-700 text-white">
        <h2 className="text-xl font-semibold">Quotation Preview</h2>
        <p className="text-blue-100">
          Preview and download the quotation as PDF
        </p>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div
          className="w-full bg-gray-100 rounded-lg p-4 mb-6 relative overflow-hidden"
          style={{ height: "500px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full overflow-hidden">
              {/* This is a placeholder for the PDF preview. In a real implementation, 
                  you might use a library like react-pdf-viewer or a custom preview component */}
              <img
                src="https://images.pexels.com/photos/7412095/pexels-photo-7412095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="PDF Preview"
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 overflow-auto">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                  <h1 className="text-2xl font-bold text-teal-700 mb-4">
                    {quotationData.clientDetails.packageName}
                  </h1>

                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Client Details
                    </h2>
                    <p className="text-gray-700">
                      {quotationData.clientDetails.name}
                    </p>
                    <p className="text-gray-700">
                      {quotationData.clientDetails.daysFormat}
                    </p>
                    <p className="text-gray-700">
                      {quotationData.clientDetails.checkInDate &&
                        quotationData.clientDetails.checkOutDate &&
                        `${format(
                          quotationData.clientDetails.checkInDate,
                          "MMM dd, yyyy"
                        )} - 
                        ${format(
                          quotationData.clientDetails.checkOutDate,
                          "MMM dd, yyyy"
                        )}`}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Cost Summary
                    </h2>
                    <p className="text-gray-700">
                      Cost per person: ₹
                      {quotationData.costingDetails.costPerPerson}
                    </p>
                    <p className="text-gray-700">
                      Total cost: ₹{quotationData.costingDetails.totalCost}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Itinerary Overview
                    </h2>
                    <p className="text-gray-700">
                      {quotationData.itinerary.length} days planned
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 italic mt-6">
                    This is a simplified preview. Download the PDF to see the
                    complete quotation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lazy-load PDF creation UI when user wants to download - this keeps react-pdf out of the main bundle */}
        <Suspense
          fallback={
            <button
              disabled
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-400"
            >
              Preparing...
            </button>
          }
        >
          <LazyPDFControls data={quotationData} fileName={fileName} />
        </Suspense>

        <p className="mt-4 text-sm text-gray-500">
          The downloaded PDF will contain all the information you've entered in
          the form.
        </p>
      </div>
    </div>
  );
};

export default PDFPreview;
