import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { FormField } from "../ui/FormField";
import { useAuth } from "../../context/AuthContext";
import RoleBasedField from "../RoleBasedField";
import { hotels } from "../../data/hotels";
import { format } from "date-fns";

const packageTypes = [
  { key: "standard", label: "Standard", packageType: "STANDARD" },
  { key: "comfort", label: "Comfort", packageType: "COMFORT" },
  { key: "luxury", label: "Luxury", packageType: "LUXURY" },
];

const packageNightlyPremium: Record<'standard' | 'comfort' | 'luxury', number> = {
  standard: 1000,
  comfort: 700,
  luxury: 700,
};

const HotelCostingForm: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuotationData>();

  const { user } = useAuth();

  // Watch relevant fields
  const itinerary = watch("itinerary");
  const clientDetails = watch("clientDetails");
  const hotelCostingDetails = watch("hotelCostingDetails");
  const customerRequirements = watch("customerRequirements");

  // Get unique selected locations from itinerary
  const selectedLocations = React.useMemo(() => {
    return Array.from(
      new Set((itinerary || []).map((d: any) => d.location))
    );
  }, [itinerary]);

  // Get number of nights from clientDetails.daysFormat (e.g., "3 Nights / 4 Days")
  const totalNights = (() => {
    const match = clientDetails?.daysFormat?.match(
      /(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i
    );
    return match ? parseInt(match[1], 10) : 1;
  })();

  // Calculate total room count from room allocations
  const totalRoomCount = (clientDetails?.roomAllocations || []).reduce(
    (total, allocation) => total + (allocation.roomCount || 0),
    0
  );


  const isSingleLocation = selectedLocations.length === 1;
  const isMultipleLocations = selectedLocations.length > 1;

  // Helper to get hotels for a location and package type
  function getHotelsFor(location: string, packageType: string) {
    // Location aliasing for pricing
    let targetLocation = (location || '').toUpperCase();
    const targetPackage = (packageType || '').toUpperCase();

    // Use Ooty rates for Chikmagalur and Kodaikanal
    if (targetLocation === 'CHIKMAGALUR' || targetLocation === 'KODAIKANAL') {
      targetLocation = 'OOTY';
    }

    return hotels.filter(
      (h) => h.location.toUpperCase() === targetLocation && h.packageType === targetPackage
    );
  }

  // Helper to calculate average hotel cost for a package type and specific location
  const getLocationAverageHotelCost = React.useCallback((location: string, packageType: string, nights: number): number => {
    const packageKey = (packageType || '').toLowerCase() as 'standard' | 'comfort' | 'luxury';
    const rooms = totalRoomCount || 0;
    if (rooms === 0 || nights <= 0) return 0;

    const hotelsForLoc = getHotelsFor(location, packageType);
    if (hotelsForLoc.length === 0) {
      return 0;
    }

    const total = hotelsForLoc.reduce((sum, hotel) => sum + hotel.tacSeason, 0);
    const average = total / hotelsForLoc.length;
    if (average <= 0) {
      return 0;
    }

    const nightlyPremium = packageNightlyPremium[packageKey] ?? 0;
    const adjustedAverage = average + nightlyPremium;
    return Math.round(adjustedAverage * rooms * nights);
  }, [totalRoomCount]);

  // Helper to calculate total average cost across all selected locations (excluding skipped)
  const getTotalAverageHotelCost = React.useCallback((packageType: string): number => {
    let totalCost = 0;
    
    selectedLocations.forEach((location) => {
      // Skip if location is marked as skipped
      if (hotelCostingDetails?.skippedLocations?.[location]) {
        return;
      }
      
      const locationNights = hotelCostingDetails?.locationDays?.[location] || Math.floor(totalNights / selectedLocations.length);
      const locationCost = getLocationAverageHotelCost(location, packageType, locationNights);
      totalCost += locationCost;
    });
    
    return totalCost;
  }, [selectedLocations, hotelCostingDetails?.skippedLocations, hotelCostingDetails?.locationDays, totalNights, getLocationAverageHotelCost]);

  // Set hotel cost automatically when locations or nights change
  React.useEffect(() => {
    if (selectedLocations.length > 0 && customerRequirements?.type !== 'travel_only') {
      packageTypes.forEach(({ key, packageType }) => {
        const totalCost = getTotalAverageHotelCost(packageType);
        setValue(`hotelCostingDetails.${key}.baseCost` as any, totalCost);
        setValue(`hotelCostingDetails.${key}.days` as any, totalNights);
        setValue(`hotelCostingDetails.${key}.location` as any, selectedLocations.join(", "));
        setValue(`hotelCostingDetails.${key}.packageType` as any, `${key.charAt(0).toUpperCase() + key.slice(1)} Package`);
      });
    }
  }, [selectedLocations, totalNights, setValue, customerRequirements?.type, getTotalAverageHotelCost]);

  // Watch individual package values for final cost calculation
  const standardBaseCost = watch("hotelCostingDetails.standard.baseCost");
  const standardExtraCost = watch("hotelCostingDetails.standard.extraCost");
  const comfortBaseCost = watch("hotelCostingDetails.comfort.baseCost");
  const comfortExtraCost = watch("hotelCostingDetails.comfort.extraCost");
  const luxuryBaseCost = watch("hotelCostingDetails.luxury.baseCost");
  const luxuryExtraCost = watch("hotelCostingDetails.luxury.extraCost");


  // Calculate final cost with 15% margin + extra cost for each package
  React.useEffect(() => {
    if (customerRequirements?.type !== 'travel_only') {
      // Standard package
      const standardCostWithMargin = Math.round((standardBaseCost || 0) * 1.15);
      const standardFinalCost = standardCostWithMargin + (standardExtraCost || 0);
      setValue("hotelCostingDetails.standard.finalCost", standardFinalCost);

      // Comfort package
      const comfortCostWithMargin = Math.round((comfortBaseCost || 0) * 1.15);
      const comfortFinalCost = comfortCostWithMargin + (comfortExtraCost || 0);
      setValue("hotelCostingDetails.comfort.finalCost", comfortFinalCost);

      // Luxury package
      const luxuryCostWithMargin = Math.round((luxuryBaseCost || 0) * 1.15);
      const luxuryFinalCost = luxuryCostWithMargin + (luxuryExtraCost || 0);
      setValue("hotelCostingDetails.luxury.finalCost", luxuryFinalCost);
    }
  }, [standardBaseCost, standardExtraCost, comfortBaseCost, comfortExtraCost, luxuryBaseCost, luxuryExtraCost, customerRequirements, setValue]);

  // Handle night distribution for multiple locations
  const handleNightDistribution = (location: string, nights: number) => {
    const currentLocationNights = hotelCostingDetails?.locationDays || {};
    const otherLocationsTotal = Object.entries(currentLocationNights)
      .filter(([loc]) => loc !== location)
      .reduce((sum, [, locNights]) => sum + (typeof locNights === 'number' ? locNights : 0), 0);
    
    if (otherLocationsTotal + nights <= totalNights) {
      setValue(`hotelCostingDetails.locationDays.${location}`, nights);
      
      // Initialize location details if not exists
      if (!hotelCostingDetails?.locationDetails?.[location]) {
        setValue(`hotelCostingDetails.locationDetails.${location}`, {
          days: nights,
          checkInDate: null,
          checkOutDate: null
        });
      } else {
        setValue(`hotelCostingDetails.locationDetails.${location}.days`, nights);
      }
      
      // Recalculate costs for all packages based on new night distribution
      packageTypes.forEach(({ key, packageType }) => {
        const totalCost = getTotalAverageHotelCost(packageType);
        setValue(`hotelCostingDetails.${key}.baseCost`, totalCost);
      });
    }
  };

  // Handle location date changes
  const handleLocationDateChange = (location: string, field: 'checkInDate' | 'checkOutDate', value: string) => {
    const date = value ? new Date(value) : null;
    
    // Initialize location details if not exists
    if (!hotelCostingDetails?.locationDetails?.[location]) {
              setValue(`hotelCostingDetails.locationDetails.${location}`, {
          days: hotelCostingDetails?.locationDays?.[location] || Math.floor(totalNights / selectedLocations.length),
          checkInDate: field === 'checkInDate' ? date : null,
          checkOutDate: field === 'checkOutDate' ? date : null
        });
    } else {
      setValue(`hotelCostingDetails.locationDetails.${location}.${field}`, date);
    }
  };

  // Handle location skipping
  const handleLocationSkip = (location: string, skip: boolean) => {
    setValue(`hotelCostingDetails.skippedLocations.${location}`, skip);
    
    // If skipping, set nights to 0, otherwise restore default
    if (skip) {
      setValue(`hotelCostingDetails.locationDays.${location}`, 0);
    } else {
      const defaultNights = Math.floor(totalNights / selectedLocations.length);
      setValue(`hotelCostingDetails.locationDays.${location}`, defaultNights);
    }
    
    // Recalculate costs for all packages
    packageTypes.forEach(({ key, packageType }) => {
      const totalCost = getTotalAverageHotelCost(packageType);
      setValue(`hotelCostingDetails.${key}.baseCost`, totalCost);
    });
  };

  // Don't render if customer requirements is set to travel_only
  if (customerRequirements?.type === 'travel_only') {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Hotel Costing Details</h3>
        <div className="p-4 border rounded-md bg-yellow-50">
          <p className="text-yellow-800">
            Hotel costing is disabled because "Travel Only" is selected in Customer Requirements.
          </p>
        </div>
      </div>
    );
  }

  if (selectedLocations.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Hotel Costing Details</h3>
        <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-gray-600">
            Please select locations in the Itinerary section first to configure hotel costing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Hotel Costing Details</h3>

      {/* Location and Day Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Selected Location(s)">
          <input
            type="text"
            value={selectedLocations.join(", ")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
            readOnly
          />
          <p className="mt-1 text-sm text-gray-500">From itinerary selection</p>
        </FormField>

        <FormField label="Total Tour Nights">
          <input
            type="text"
            value={`${totalNights} nights`}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
            readOnly
          />
          <p className="mt-1 text-sm text-gray-500">From tour format selection</p>
        </FormField>
      </div>

      {/* Night Distribution and Dates for Multiple Locations */}
      {isMultipleLocations && (
        <div className="p-4 border rounded-md bg-blue-50">
          <h4 className="text-sm font-medium text-blue-900 mb-4">Location Details & Night Distribution</h4>
          <div className="space-y-4">
            {selectedLocations.map((location) => {
              const currentNights = hotelCostingDetails?.locationDays?.[location] || Math.floor(totalNights / selectedLocations.length);
              const locationDetails = hotelCostingDetails?.locationDetails?.[location];
              const isSkipped = hotelCostingDetails?.skippedLocations?.[location] || false;
              
              return (
                <div key={location} className={`bg-white p-4 rounded border ${isSkipped ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-semibold text-gray-900">{location}</h5>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`skip-${location}`}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        checked={isSkipped}
                        onChange={(e) => handleLocationSkip(location, e.target.checked)}
                      />
                      <label htmlFor={`skip-${location}`} className="text-sm text-red-600 font-medium">
                        Skip Hotel
                      </label>
                    </div>
                  </div>
                  
                  {!isSkipped && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField label="Nights">
                        <input
                          type="number"
                          min="0"
                          max={totalNights}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                          value={currentNights}
                          onChange={(e) => handleNightDistribution(location, parseInt(e.target.value) || 0)}
                        />
                      </FormField>
                    
                    <FormField label="Check-in Date">
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        value={locationDetails?.checkInDate ? format(locationDetails.checkInDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => handleLocationDateChange(location, 'checkInDate', e.target.value)}
                      />
                    </FormField>
                    
                    <FormField label="Check-out Date">
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        value={locationDetails?.checkOutDate ? format(locationDetails.checkOutDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => handleLocationDateChange(location, 'checkOutDate', e.target.value)}
                      />
                    </FormField>
                  </div>
                  )}
                  
                  {isSkipped && (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">Hotel booking is skipped for this location</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-blue-700">
            Total allocated: {Object.values(hotelCostingDetails?.locationDays || {}).reduce((sum: number, nights) => sum + (typeof nights === 'number' ? nights : 0), 0)} / {totalNights} nights
          </p>
        </div>
      )}

      {/* Single Location Date Management */}
      {isSingleLocation && (
        <div className="p-4 border rounded-md bg-blue-50">
          <h4 className="text-sm font-medium text-blue-900 mb-4">Check-in & Check-out Dates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Check-in Date">
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                value={hotelCostingDetails?.locationDetails?.[selectedLocations[0]]?.checkInDate ? 
                  format(hotelCostingDetails.locationDetails[selectedLocations[0]].checkInDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleLocationDateChange(selectedLocations[0], 'checkInDate', e.target.value)}
              />
            </FormField>
            
            <FormField label="Check-out Date">
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                value={hotelCostingDetails?.locationDetails?.[selectedLocations[0]]?.checkOutDate ? 
                  format(hotelCostingDetails.locationDetails[selectedLocations[0]].checkOutDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleLocationDateChange(selectedLocations[0], 'checkOutDate', e.target.value)}
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Package Costing Tables */}
      {packageTypes.map(({ key, label, packageType }) => {
        const pkg = hotelCostingDetails?.[key as keyof typeof hotelCostingDetails];
        const baseCost = typeof pkg === 'object' && pkg ? pkg.baseCost : 0;
        const extraCost = typeof pkg === 'object' && pkg ? pkg.extraCost : 0;
        const finalCost = typeof pkg === 'object' && pkg ? pkg.finalCost : 0;

        return (
          <div key={key} className="p-4 border rounded-md bg-gray-50">
            <h4 className="text-lg font-medium text-gray-900 mb-4">{label} Package</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Base Cost (Average)">
                <RoleBasedField 
                  hideForEmployee={true} 
                  showPlaceholder={true}
                  placeholderText="Hidden"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                >
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                  {...register(`hotelCostingDetails.${key}.baseCost`, {
                    valueAsNumber: true,
                  })}
                  readOnly
                />
                </RoleBasedField>
                <p className="mt-1 text-sm text-gray-500">
                  Average cost across all hotels in selected locations
                </p>
              </FormField>

              <FormField label="Extra Cost">
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  placeholder="0"
                  {...register(`hotelCostingDetails.${key}.extraCost`, {
                    valueAsNumber: true,
                    min: { value: 0, message: "Extra cost cannot be negative" },
                  })}
                />
                <p className="mt-1 text-sm text-gray-500">Additional cost</p>
              </FormField>

              <FormField label="Final Cost">
                <RoleBasedField 
                  hideForEmployee={true} 
                  showPlaceholder={true}
                  placeholderText="Hidden"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 font-semibold sm:text-sm"
                >
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 font-semibold sm:text-sm"
                  {...register(`hotelCostingDetails.${key}.finalCost`, {
                    valueAsNumber: true,
                  })}
                  readOnly
                />
                </RoleBasedField>
                <p className="mt-1 text-sm text-gray-500">Base + 15% margin + extra cost</p>
              </FormField>
            </div>

            {/* Location-wise cost breakdown */}
            {isMultipleLocations && baseCost > 0 && user?.role === 'admin' && (
              <div className="mt-4 p-3 border rounded-md bg-white">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Location-wise Breakdown</h5>
                <div className="text-sm text-gray-700 space-y-1">
                  {selectedLocations.map((location) => {
                    const isSkipped = hotelCostingDetails?.skippedLocations?.[location] || false;
                    if (isSkipped) {
                      return (
                        <p key={location} className="text-gray-500 italic">
                          {location}: Hotel skipped
                        </p>
                      );
                    }
                    
                    const locationNights = hotelCostingDetails?.locationDays?.[location] || Math.floor(totalNights / selectedLocations.length);
                    const locationCost = getLocationAverageHotelCost(location, packageType, locationNights);
                    return (
                      <p key={location}>
                        {location}: ₹{locationCost} ({locationNights} nights)
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {baseCost > 0 && user?.role === 'admin' && (
              <div className="mt-4 p-3 border rounded-md bg-white">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Cost Breakdown</h5>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Base Cost (Average): ₹{baseCost}</p>
                  <p>With 15% Margin: ₹{Math.round(baseCost * 1.15)}</p>
                  <p>Extra Cost: ₹{extraCost || 0}</p>
                  <hr className="my-2 border-gray-200" />
                  <p className="font-semibold">Final Hotel Cost: ₹{finalCost}</p>
                  <p className="text-xs text-gray-500">
                    Calculation: {Math.round(baseCost * 1.15)} + {extraCost || 0} = {finalCost}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HotelCostingForm; 
