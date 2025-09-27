import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { FormField } from "../ui/FormField";
import { useAuth } from "../../context/AuthContext";

const packageTypes = [
  { key: "standard", label: "Standard", packageType: "STANDARD" },
  { key: "comfort", label: "Comfort", packageType: "COMFORT" },
  { key: "luxury", label: "Luxury", packageType: "LUXURY" },
];

const FinalCostingForm: React.FC = () => {
  const {
    setValue,
    watch,
    getValues,
  } = useFormContext<QuotationData>();

  const { user } = useAuth();

  // Watch relevant fields
  const customerRequirements = watch("customerRequirements");
  const travelCostingDetails = watch("travelCostingDetails");
  const hotelCostingDetails = watch("hotelCostingDetails");
  const finalCostingDetails = watch("finalCostingDetails");

  // Force calculation function
  const forceCalculateCosts = React.useCallback(() => {
    console.log("Force calculating final costs...");
    
    const formData = getValues();
    const travelCost = formData.customerRequirements?.type === 'rooms_only' ? 0 : (formData.travelCostingDetails?.finalTravelCost || 0);
    
    console.log("Current form data:", {
      travelCostingDetails: formData.travelCostingDetails,
      hotelCostingDetails: formData.hotelCostingDetails,
      customerRequirements: formData.customerRequirements
    });
    
    packageTypes.forEach(({ key, label }) => {
      const hotelPkg = formData.hotelCostingDetails?.[key as keyof typeof formData.hotelCostingDetails];
      const hotelCost = formData.customerRequirements?.type === 'travel_only' ? 0 : 
        (typeof hotelPkg === 'object' && hotelPkg && 'finalCost' in hotelPkg && typeof hotelPkg.finalCost === 'number' ? hotelPkg.finalCost : 0);
      
      const totalCost = travelCost + hotelCost;
      
      console.log(`${key}: travel=${travelCost}, hotel=${hotelCost}, total=${totalCost}`);
      
      setValue(`finalCostingDetails.${key}.hotelCost`, hotelCost);
      setValue(`finalCostingDetails.${key}.travelCost`, travelCost);
      setValue(`finalCostingDetails.${key}.totalCost`, totalCost);
      setValue(`finalCostingDetails.${key}.packageType`, `${label} Package`);
    });
  }, [getValues, setValue, customerRequirements]);

  // Calculate final costs and update the form data
  React.useEffect(() => {
    forceCalculateCosts();
  }, [forceCalculateCosts, travelCostingDetails?.finalTravelCost, hotelCostingDetails?.standard?.finalCost, hotelCostingDetails?.comfort?.finalCost, hotelCostingDetails?.luxury?.finalCost, customerRequirements?.type]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Final Costing Summary</h3>
        <button
          type="button"
          onClick={forceCalculateCosts}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Refresh Costs
        </button>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Cost Calculation</h4>
        <p className="text-sm text-blue-800">
          This section automatically calculates the final costs based on your Travel Costing and Hotel Costing inputs.
          To modify costs, please go back to the respective costing sections. Use "Refresh Costs" if values don't update automatically.
        </p>
      </div>

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packageTypes.map(({ key, label }) => {
          const packageData = finalCostingDetails?.[key as keyof typeof finalCostingDetails];
          const travelCost = typeof packageData === 'object' && packageData ? packageData.travelCost : 0;
          const hotelCost = typeof packageData === 'object' && packageData ? packageData.hotelCost : 0;
          const totalCost = typeof packageData === 'object' && packageData ? packageData.totalCost : 0;

          return (
            <div key={key} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{label} Package</h4>
              
              <div className="space-y-3">
                {customerRequirements?.type !== 'travel_only' && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hotel Cost:</span>
                    <span className="text-sm font-medium">
                      {user?.role === 'employee' ? 'Hidden' : `₹${hotelCost.toLocaleString()}`}
                    </span>
                  </div>
                )}
                
                {customerRequirements?.type !== 'rooms_only' && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Travel Cost:</span>
                    <span className="text-sm font-medium">
                      {user?.role === 'employee' ? 'Hidden' : `₹${travelCost.toLocaleString()}`}
                    </span>
                  </div>
                )}
                
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900">Total Cost:</span>
                  <span className="text-base font-bold text-teal-600">
                    {user?.role === 'employee' ? 'Hidden' : `₹${totalCost.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes Section */}
      <FormField label="Additional Notes">
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          rows={3}
          placeholder="Any additional notes about the pricing..."
          value={finalCostingDetails?.notes || ""}
          onChange={(e) => setValue("finalCostingDetails.notes", e.target.value)}
        />
      </FormField>

      {/* Cross-validation warnings */}
      <div className="space-y-4">
        {/* Travel validation */}
        {customerRequirements?.type !== 'rooms_only' && !travelCostingDetails?.finalTravelCost && (
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <h5 className="text-sm font-medium text-orange-900">Travel Costing Incomplete</h5>
            <p className="text-sm text-orange-800">
              Please complete the Travel Costing section to get accurate final pricing.
            </p>
          </div>
        )}

        {/* Hotel validation */}
        {customerRequirements?.type !== 'travel_only' && !hotelCostingDetails?.standard?.finalCost && (
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <h5 className="text-sm font-medium text-orange-900">Hotel Costing Incomplete</h5>
            <p className="text-sm text-orange-800">
              Please complete the Hotel Costing section to get accurate final pricing.
            </p>
          </div>
        )}

        {/* Requirements validation */}
        {!customerRequirements?.type && (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <h5 className="text-sm font-medium text-red-900">Customer Requirements Missing</h5>
            <p className="text-sm text-red-800">
              Please select your requirements type (All, Rooms Only, or Travel Only) to enable proper cost calculation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalCostingForm; 