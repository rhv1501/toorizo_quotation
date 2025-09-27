import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { FormField } from "../ui/FormField";

const CustomerRequirementsForm: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<QuotationData>();

  const selectedType = watch("customerRequirements.type");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Customer Requirements</h3>
      
      <FormField
        label="What would you like to include in this quotation?"
        error={errors.customerRequirements?.type?.message}
      >
        <div className="mt-2 space-y-4">
          <div className="flex items-center">
            <input
              id="requirements-all"
              type="radio"
              value="all"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
              {...register("customerRequirements.type", {
                required: "Please select a requirement type",
              })}
            />
            <label htmlFor="requirements-all" className="ml-3 block text-sm font-medium text-gray-700">
              All (Hotels & Transport)
            </label>
          </div>
          <p className="ml-7 text-sm text-gray-500">
            Include both accommodation and transportation details in the quotation
          </p>

          <div className="flex items-center">
            <input
              id="requirements-rooms"
              type="radio"
              value="rooms_only"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
              {...register("customerRequirements.type", {
                required: "Please select a requirement type",
              })}
            />
            <label htmlFor="requirements-rooms" className="ml-3 block text-sm font-medium text-gray-700">
              Rooms Only
            </label>
          </div>
          <p className="ml-7 text-sm text-gray-500">
            Include only accommodation details, no transportation
          </p>

          <div className="flex items-center">
            <input
              id="requirements-travel"
              type="radio"
              value="travel_only"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
              {...register("customerRequirements.type", {
                required: "Please select a requirement type",
              })}
            />
            <label htmlFor="requirements-travel" className="ml-3 block text-sm font-medium text-gray-700">
              Travel Only
            </label>
          </div>
          <p className="ml-7 text-sm text-gray-500">
            Include only transportation details, no accommodation
          </p>
        </div>
      </FormField>

      {selectedType && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Selection Summary</h4>
          <div className="text-sm text-gray-700">
            {selectedType === 'all' && (
              <p>✓ Both hotel costing and travel costing sections will be available for input and will appear in the final quotation.</p>
            )}
            {selectedType === 'rooms_only' && (
              <p>✓ Only hotel costing section will be available for input and will appear in the final quotation. Travel costing will be hidden.</p>
            )}
            {selectedType === 'travel_only' && (
              <p>✓ Only travel costing section will be available for input and will appear in the final quotation. Hotel costing will be hidden.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerRequirementsForm; 