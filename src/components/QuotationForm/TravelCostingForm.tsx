import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { FormField } from "../ui/FormField";
import { useAuth } from "../../context/AuthContext";
import RoleBasedField from "../RoleBasedField";
import {
  startLocations,
  endLocations,
  vehicleTypes,
  getTravelCostData,
  convertDaysFormatToNightsDay,
} from "../../data/travelCosts";

const TravelCostingForm: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuotationData>();

  const { user } = useAuth();

  const startLocation = watch("travelCostingDetails.startLocation");
  const endLocation = watch("travelCostingDetails.endLocation");
  const transportType = watch("travelCostingDetails.transportType");
  const baseTravelCost = watch("travelCostingDetails.baseTravelCost");
  const extraCost = watch("travelCostingDetails.extraCost") || 0;
  const daysFormat = watch("clientDetails.daysFormat");
  const customerRequirements = watch("customerRequirements");
  const useDummyTransport = watch("travelCostingDetails.useDummyTransport");
  const dummyTransportCost = watch("travelCostingDetails.dummyTransportCost");
  const marginPercentage = watch("travelCostingDetails.marginPercentage");

  // Check if travel costing should be disabled
  const isDisabled = customerRequirements?.type === "rooms_only";

  // State to track manual mode for locations
  const [isStartLocationManual, setIsStartLocationManual] =
    React.useState(false);
  const [isEndLocationManual, setIsEndLocationManual] = React.useState(false);

  // Check if current locations are custom (not in predefined lists)
  React.useEffect(() => {
    if (startLocation && !startLocations.includes(startLocation)) {
      setIsStartLocationManual(true);
    }
  }, [startLocation]);

  React.useEffect(() => {
    if (endLocation && !endLocations.includes(endLocation)) {
      setIsEndLocationManual(true);
    }
  }, [endLocation]);

  // Get current travel data to show additional info
  const currentTravelData = React.useMemo(() => {
    if (!startLocation || !endLocation || !transportType || !daysFormat)
      return null;

    const nightsDaysFormat = convertDaysFormatToNightsDay(daysFormat);
    return getTravelCostData(
      startLocation,
      endLocation,
      transportType,
      nightsDaysFormat
    );
  }, [startLocation, endLocation, transportType, daysFormat]);

  // Check if transport type requires manual entry
  const requiresManualEntry = React.useMemo(() => {
    const manualEntryTypes = [
      "12 SEATER",
      "21 SEATER",
      "32 SEATER",
      "50 SEATER",
    ];
    return manualEntryTypes.includes(transportType?.toUpperCase() || "");
  }, [transportType]);

  // Check if tour format is beyond 4N5D
  const isExtendedTour = React.useMemo(() => {
    if (!daysFormat) return false;
    const match = daysFormat.match(/(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i);
    if (match) {
      const nights = parseInt(match[1], 10);
      return nights > 4;
    }
    return false;
  }, [daysFormat]);

  // Handle location selection changes
  const handleStartLocationChange = (value: string) => {
    if (value === "Manual") {
      setIsStartLocationManual(true);
      setValue("travelCostingDetails.startLocation", "");
    } else {
      setIsStartLocationManual(false);
      setValue("travelCostingDetails.startLocation", value);
    }
  };

  const handleEndLocationChange = (value: string) => {
    if (value === "Manual") {
      setIsEndLocationManual(true);
      setValue("travelCostingDetails.endLocation", "");
    } else {
      setIsEndLocationManual(false);
      setValue("travelCostingDetails.endLocation", value);
    }
  };

  // Handle back to dropdown
  const handleBackToStartDropdown = () => {
    setIsStartLocationManual(false);
    setValue("travelCostingDetails.startLocation", "");
  };

  const handleBackToEndDropdown = () => {
    setIsEndLocationManual(false);
    setValue("travelCostingDetails.endLocation", "");
  };

  // Calculate travel cost based on selection
  React.useEffect(() => {
    if (useDummyTransport) {
      // For DUMMY transport, set base cost to the dummy cost
      setValue("travelCostingDetails.baseTravelCost", dummyTransportCost || 0);
      return;
    }

    if (requiresManualEntry) {
      // For seater types, leave base cost empty (0) for manual input
      setValue("travelCostingDetails.baseTravelCost", 0);
      return;
    }

    if (isExtendedTour) {
      // For extended tours, leave base cost empty (0) for manual input
      setValue("travelCostingDetails.baseTravelCost", 0);
      return;
    }

    // Skip auto-calculation if either location is manual
    if (isStartLocationManual || isEndLocationManual) {
      setValue("travelCostingDetails.baseTravelCost", 0);
      return;
    }

    if (startLocation && endLocation && transportType && daysFormat) {
      const nightsDaysFormat = convertDaysFormatToNightsDay(daysFormat);
      // Debug: log inputs so we can trace why auto-calculation may not run
      // (remove these logs after verification)
      console.debug("[TravelCostingForm] calculate baseTravelCost ->", {
        startLocation,
        endLocation,
        transportType,
        daysFormat,
        nightsDaysFormat,
      });

      const travelData = getTravelCostData(
        startLocation,
        endLocation,
        transportType,
        nightsDaysFormat
      );
      console.debug("[TravelCostingForm] found travelData:", travelData);

      const baseCost = travelData?.payable || 0;
      setValue("travelCostingDetails.baseTravelCost", baseCost);
    }
  }, [
    startLocation,
    endLocation,
    transportType,
    daysFormat,
    setValue,
    isExtendedTour,
    useDummyTransport,
    dummyTransportCost,
    requiresManualEntry,
    isStartLocationManual,
    isEndLocationManual,
  ]);

  // Calculate final travel cost with margin + extra cost
  React.useEffect(() => {
    if (baseTravelCost !== undefined) {
      const margin = (marginPercentage || 15) / 100; // Default to 15% if not set
      const costWithMargin = Math.round(baseTravelCost * (1 + margin));
      const finalCost = costWithMargin + extraCost;
      setValue("travelCostingDetails.finalTravelCost", finalCost);
    }
  }, [baseTravelCost, extraCost, marginPercentage, setValue]);

  // Set default margin percentage if not set
  React.useEffect(() => {
    if (marginPercentage === undefined || marginPercentage === null) {
      setValue("travelCostingDetails.marginPercentage", 15);
    }
  }, [marginPercentage, setValue]);

  // Don't calculate if disabled
  React.useEffect(() => {
    if (isDisabled) {
      setValue("travelCostingDetails.finalTravelCost", 0);
    }
  }, [isDisabled, setValue]);

  if (isDisabled) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">
          Travel Costing Details
        </h3>
        <div className="p-4 border rounded-md bg-yellow-50">
          <p className="text-yellow-800">
            Travel costing is disabled because "Rooms Only" is selected in
            Customer Requirements. To enable travel costing, please go back to
            Customer Requirements and select "All" or "Travel Only".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Travel Costing Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Start Location"
          error={errors.travelCostingDetails?.startLocation?.message}
        >
          {isStartLocationManual ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter custom start location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                {...register("travelCostingDetails.startLocation", {
                  required: "Start location is required",
                })}
              />
              <button
                type="button"
                onClick={handleBackToStartDropdown}
                className="text-xs text-teal-600 hover:text-teal-800"
              >
                ← Back to dropdown options
              </button>
            </div>
          ) : (
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value={startLocation || ""}
              onChange={(e) => handleStartLocationChange(e.target.value)}
            >
              <option value="">Select start location</option>
              {startLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
              <option value="Manual">Manual (Enter custom location)</option>
            </select>
          )}
        </FormField>

        <FormField
          label="End Location"
          error={errors.travelCostingDetails?.endLocation?.message}
        >
          {isEndLocationManual ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter custom end location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                {...register("travelCostingDetails.endLocation", {
                  required: "End location is required",
                })}
              />
              <button
                type="button"
                onClick={handleBackToEndDropdown}
                className="text-xs text-teal-600 hover:text-teal-800"
              >
                ← Back to dropdown options
              </button>
            </div>
          ) : (
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value={endLocation || ""}
              onChange={(e) => handleEndLocationChange(e.target.value)}
            >
              <option value="">Select end location</option>
              {endLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
              <option value="Manual">Manual (Enter custom location)</option>
            </select>
          )}
        </FormField>
      </div>

      <FormField
        label="Transport Type"
        error={errors.travelCostingDetails?.transportType?.message}
      >
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          {...register("travelCostingDetails.transportType", {
            required: !useDummyTransport ? "Transport type is required" : false,
          })}
          disabled={useDummyTransport}
        >
          <option value="">Select transport type</option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormField>

      {/* DUMMY Transport Option */}
      <div className="p-4 border rounded-md bg-blue-50">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="useDummyTransport"
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            {...register("travelCostingDetails.useDummyTransport")}
          />
          <label
            htmlFor="useDummyTransport"
            className="text-sm font-medium text-gray-900"
          >
            Use DUMMY Transport Cost
          </label>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Enable this to manually input a custom transport amount. The 15%
          margin will be added automatically.
        </p>

        {useDummyTransport && (
          <div className="mt-4">
            <FormField
              label="DUMMY Transport Cost"
              error={errors.travelCostingDetails?.dummyTransportCost?.message}
            >
              <input
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                placeholder="Enter custom transport cost"
                {...register("travelCostingDetails.dummyTransportCost", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "DUMMY transport cost cannot be negative",
                  },
                  required: useDummyTransport
                    ? "DUMMY transport cost is required"
                    : false,
                })}
              />
              <p className="mt-1 text-sm text-gray-500">
                Base transport cost (before margin and extra costs)
              </p>
            </FormField>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Base Travel Cost"
          error={errors.travelCostingDetails?.baseTravelCost?.message}
        >
          <RoleBasedField
            hideForEmployee={true}
            showPlaceholder={true}
            placeholderText="Hidden"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          >
            <input
              type="number"
              min="0"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
                useDummyTransport ||
                isExtendedTour ||
                requiresManualEntry ||
                (!currentTravelData && !isExtendedTour)
                  ? ""
                  : "bg-gray-50"
              }`}
              {...register("travelCostingDetails.baseTravelCost", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Base travel cost cannot be negative",
                },
                required: requiresManualEntry
                  ? "Base travel cost is required for this transport type"
                  : false,
              })}
              readOnly={
                !useDummyTransport &&
                !isExtendedTour &&
                !requiresManualEntry &&
                currentTravelData !== null
              }
              placeholder={
                useDummyTransport
                  ? "Set by DUMMY cost"
                  : isExtendedTour || requiresManualEntry
                  ? "Enter cost manually"
                  : "0"
              }
            />
          </RoleBasedField>
          <p className="mt-1 text-sm text-gray-500">
            {useDummyTransport
              ? "This value is set by the DUMMY transport cost above"
              : requiresManualEntry
              ? "Manual entry required for this transport type"
              : isExtendedTour
              ? "Extended tour format detected. Please enter cost manually."
              : currentTravelData
              ? "Automatically calculated based on route and transport type"
              : "No data available for this combination. Please enter cost manually."}
          </p>
        </FormField>

        <FormField
          label="Extra Cost"
          error={errors.travelCostingDetails?.extraCost?.message}
        >
          <input
            type="number"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="0"
            {...register("travelCostingDetails.extraCost", {
              valueAsNumber: true,
              min: { value: 0, message: "Extra cost cannot be negative" },
            })}
          />
          <p className="mt-1 text-sm text-gray-500">
            Additional cost to add on top of the 15% margin
          </p>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Margin Percentage"
          error={errors.travelCostingDetails?.marginPercentage?.message}
        >
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="15"
            {...register("travelCostingDetails.marginPercentage", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Margin percentage cannot be negative",
              },
              max: {
                value: 100,
                message: "Margin percentage cannot exceed 100%",
              },
            })}
            readOnly={user?.role === "employee"}
            disabled={user?.role === "employee"}
          />
          <p className="mt-1 text-sm text-gray-500">
            Margin percentage applied to base travel cost (default: 15%)
          </p>
        </FormField>

        <FormField
          label="Final Travel Cost"
          error={errors.travelCostingDetails?.finalTravelCost?.message}
        >
          <RoleBasedField
            hideForEmployee={true}
            showPlaceholder={true}
            placeholderText="Hidden"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-gray-50 font-semibold"
          >
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-gray-50 font-semibold"
              {...register("travelCostingDetails.finalTravelCost", {
                valueAsNumber: true,
              })}
              readOnly
            />
          </RoleBasedField>
          <p className="mt-1 text-sm text-gray-500">
            Base cost + {marginPercentage || 15}% margin + extra cost
          </p>
        </FormField>
      </div>

      {currentTravelData && user?.role === "admin" && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Travel Details
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-medium">Distance:</span>
              <p>{currentTravelData.km} KM</p>
            </div>
            <div>
              <span className="font-medium">Bata:</span>
              <p>₹{currentTravelData.bata}</p>
            </div>
            <div>
              <span className="font-medium">Permit:</span>
              <p>₹{currentTravelData.permit}</p>
            </div>
            <div>
              <span className="font-medium">Tolls:</span>
              <p>₹{currentTravelData.tolls}</p>
            </div>
            <div>
              <span className="font-medium">Per KM:</span>
              <p>₹{currentTravelData.perKm}</p>
            </div>
            <div>
              <span className="font-medium">Payable:</span>
              <p className="font-semibold">₹{currentTravelData.payable}</p>
            </div>
            {currentTravelData.addInfo && (
              <div className="col-span-2">
                <span className="font-medium">Additional Info:</span>
                <p className="text-xs text-blue-600">
                  {currentTravelData.addInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {baseTravelCost > 0 && user?.role === "admin" && (
        <div className="mt-6 p-4 border rounded-md bg-blue-50">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Cost Breakdown
          </h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>Base Travel Cost: ₹{baseTravelCost}</p>
            <p>With 15% Margin: ₹{Math.round(baseTravelCost * 1.15)}</p>
            <p>Extra Cost: ₹{extraCost}</p>
            <hr className="my-2 border-blue-200" />
            <p className="font-semibold">
              Final Travel Cost: ₹
              {Math.round(baseTravelCost * 1.15) + extraCost}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCostingForm;
