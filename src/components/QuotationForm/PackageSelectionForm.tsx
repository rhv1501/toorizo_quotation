import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { Package } from "lucide-react";

const PackageSelectionForm: React.FC = () => {
  const { register, watch, setValue } = useFormContext<QuotationData>();

  const packageSelection = watch("packageSelection");

  // Set all packages to true by default if undefined
  React.useEffect(() => {
    if (packageSelection === undefined) {
      setValue("packageSelection", {
        showStandard: true,
        showComfort: true,
        showLuxury: true,
      });
    }
  }, [packageSelection, setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Package className="text-teal-600" size={24} />
        <h3 className="text-lg font-medium text-gray-900">
          Package Selection for PDF
        </h3>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Select which package types you want to display
          in the final PDF. You can show all three packages or choose specific
          ones based on your client's preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors">
          <input
            type="checkbox"
            id="showStandard"
            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            {...register("packageSelection.showStandard")}
          />
          <label htmlFor="showStandard" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900 text-lg">
                  Standard Package
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Budget-friendly option with essential amenities
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-500">Green</span>
              </div>
            </div>
          </label>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
          <input
            type="checkbox"
            id="showComfort"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register("packageSelection.showComfort")}
          />
          <label htmlFor="showComfort" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900 text-lg">
                  Comfort Package
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Enhanced comfort with upgraded accommodations
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-500">Blue</span>
              </div>
            </div>
          </label>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-yellow-300 transition-colors">
          <input
            type="checkbox"
            id="showLuxury"
            className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            {...register("packageSelection.showLuxury")}
          />
          <label htmlFor="showLuxury" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900 text-lg">
                  Luxury Package
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Premium experience with top-tier services
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-500">Gold</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Visual Preview of Selected Packages */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">PDF Preview:</h4>
        <div className="flex gap-3 flex-wrap">
          {packageSelection?.showStandard && (
            <div className="px-4 py-2 bg-green-100 border-2 border-green-600 rounded-md text-green-800 font-medium">
              ✓ Standard
            </div>
          )}
          {packageSelection?.showComfort && (
            <div className="px-4 py-2 bg-blue-100 border-2 border-blue-600 rounded-md text-blue-800 font-medium">
              ✓ Comfort
            </div>
          )}
          {packageSelection?.showLuxury && (
            <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-600 rounded-md text-yellow-800 font-medium">
              ✓ Luxury
            </div>
          )}
          {!packageSelection?.showStandard &&
            !packageSelection?.showComfort &&
            !packageSelection?.showLuxury && (
              <div className="px-4 py-2 bg-red-100 border border-red-400 rounded-md text-red-800 text-sm">
                ⚠️ No packages selected - PDF will not show pricing details
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionForm;
