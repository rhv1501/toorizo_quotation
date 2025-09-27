import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { hotels } from "../../data/hotels";

const packageTypes = [
  { key: "standard", label: "Standard", packageType: "STANDARD" },
  { key: "comfort", label: "Comfort", packageType: "COMFORT" },
  { key: "luxury", label: "Luxury", packageType: "LUXURY" },
];

// Travel cost table based on screenshot
const travelCostTable = [
  // BANGALORE to OOTY
  { from: "BANGALORE", to: "OOTY", type: "SEDAN", nights: "1N2D", cost: 8700 },
  { from: "BANGALORE", to: "OOTY", type: "SEDAN", nights: "2N3D", cost: 12300 },
  { from: "BANGALORE", to: "OOTY", type: "SEDAN", nights: "3N4D", cost: 16000 },
  { from: "BANGALORE", to: "OOTY", type: "SEDAN", nights: "4N5D", cost: 19700 },
  { from: "BANGALORE", to: "OOTY", type: "SUV", nights: "1N2D", cost: 12500 },
  { from: "BANGALORE", to: "OOTY", type: "SUV", nights: "2N3D", cost: 17700 },
  { from: "BANGALORE", to: "OOTY", type: "SUV", nights: "3N4D", cost: 23000 },
  { from: "BANGALORE", to: "OOTY", type: "SUV", nights: "4N5D", cost: 28300 },
  // BANGALORE to COORG
  { from: "BANGALORE", to: "COORG", type: "SEDAN", nights: "1N2D", cost: 8200 },
  {
    from: "BANGALORE",
    to: "COORG",
    type: "SEDAN",
    nights: "2N3D",
    cost: 11800,
  },
  {
    from: "BANGALORE",
    to: "COORG",
    type: "SEDAN",
    nights: "3N4D",
    cost: 15500,
  },
  {
    from: "BANGALORE",
    to: "COORG",
    type: "SEDAN",
    nights: "4N5D",
    cost: 19200,
  },
  { from: "BANGALORE", to: "COORG", type: "SUV", nights: "1N2D", cost: 11500 },
  { from: "BANGALORE", to: "COORG", type: "SUV", nights: "2N3D", cost: 16700 },
  { from: "BANGALORE", to: "COORG", type: "SUV", nights: "3N4D", cost: 22000 },
  { from: "BANGALORE", to: "COORG", type: "SUV", nights: "4N5D", cost: 27300 },
  // MYSORE to OOTY
  { from: "MYSORE", to: "OOTY", type: "SEDAN", nights: "1N2D", cost: 8400 },
  { from: "MYSORE", to: "OOTY", type: "SEDAN", nights: "2N3D", cost: 12250 },
  { from: "MYSORE", to: "OOTY", type: "SEDAN", nights: "3N4D", cost: 16100 },
  { from: "MYSORE", to: "OOTY", type: "SEDAN", nights: "4N5D", cost: 19950 },
  { from: "MYSORE", to: "OOTY", type: "SUV", nights: "1N2D", cost: 11050 },
  { from: "MYSORE", to: "OOTY", type: "SUV", nights: "2N3D", cost: 15950 },
  { from: "MYSORE", to: "OOTY", type: "SUV", nights: "3N4D", cost: 20850 },
  { from: "MYSORE", to: "OOTY", type: "SUV", nights: "4N5D", cost: 25750 },
  // MYSORE to COORG
  { from: "MYSORE", to: "COORG", type: "SEDAN", nights: "1N2D", cost: 7900 },
  { from: "MYSORE", to: "COORG", type: "SEDAN", nights: "2N3D", cost: 11750 },
  { from: "MYSORE", to: "COORG", type: "SEDAN", nights: "3N4D", cost: 15600 },
  { from: "MYSORE", to: "COORG", type: "SEDAN", nights: "4N5D", cost: 19450 },
  { from: "MYSORE", to: "COORG", type: "SUV", nights: "1N2D", cost: 10500 },
  { from: "MYSORE", to: "COORG", type: "SUV", nights: "2N3D", cost: 14950 },
  { from: "MYSORE", to: "COORG", type: "SUV", nights: "3N4D", cost: 19450 },
  { from: "MYSORE", to: "COORG", type: "SUV", nights: "4N5D", cost: 24750 },
];

const CostingForm: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuotationData>();

  // Watch relevant fields
  const itinerary = watch("itinerary");
  const clientDetails = watch("clientDetails");
  const costingDetails = watch("costingDetails");
  const travelCostingDetails = watch("travelCostingDetails");
  const hotelCostingDetails = watch("hotelCostingDetails");
  const customerRequirements = watch("customerRequirements");

  // Get unique selected locations from itinerary
  const selectedLocations = Array.from(
    new Set((itinerary || []).map((d: any) => d.location))
  );

  // Get number of nights from clientDetails.daysFormat (e.g., "3 Nights / 4 Days")
  const numNights = (() => {
    const match = clientDetails?.daysFormat?.match(
      /(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i
    );
    return match ? parseInt(match[1], 10) : 1;
  })();

  // Get selected transport
  const selectedTransport = clientDetails?.transportProvided;

  // Calculate total room count from room allocations
  const totalRoomCount = (clientDetails?.roomAllocations || []).reduce(
    (total, allocation) => total + (allocation.roomCount || 0),
    0
  );

  // Helper to get hotels for a location and package type
  function getHotelsFor(location: string, packageType: string) {
    // Alias Chikmagalur and Kodaikanal to Ooty for pricing
    let targetLocation = (location || '').toUpperCase();
    if (targetLocation === 'CHIKMAGALUR' || targetLocation === 'KODAIKANAL') {
      targetLocation = 'OOTY';
    }
    return hotels.filter(
      (h) =>
        h.location.toUpperCase() === targetLocation &&
        h.packageType === packageType
    );
  }

  // Helper to get all selected locations
  const allSelectedLocations =
    selectedLocations.length > 0 ? selectedLocations : [""];

  // Helper to calculate average hotel cost for a package type across all selected locations
  function getAverageHotelCost(packageType: string) {
    let total = 0;
    let count = 0;
    allSelectedLocations.forEach((location) => {
      const hotelsForLoc = getHotelsFor(location, packageType);
      hotelsForLoc.forEach((h) => {
        total += h.tacSeason;
        count++;
      });
    });
    if (count === 0) return 0;
    // NEW: Multiply by total room count and nights
    return Math.round((total / count) * totalRoomCount * numNights);
  }

  // Set hotel cost automatically when locations or nights change (unless custom hotel is used)
  React.useEffect(() => {
    ["standard", "comfort", "luxury"].forEach((pkgKey) => {
      const pkg = costingDetails?.[pkgKey];
      const customHotel =
        typeof pkg === "object" && pkg !== null && "customHotel" in pkg
          ? pkg.customHotel
          : false;
      if (!customHotel) {
        const avgCost = getAverageHotelCost(pkgKey.toUpperCase());
        setValue(`costingDetails.${pkgKey}.hotelCost`, avgCost);
      }
    });
    // eslint-disable-next-line
  }, [JSON.stringify(allSelectedLocations), numNights, totalRoomCount]);

  // Handle hotel selection and auto-calculate hotel cost
  function handleHotelChange(
    pkgKey: string,
    location: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const hotelName = e.target.value;
    setValue(`costingDetails.${pkgKey}.hotelName` as any, hotelName);
    const hotel = hotels.find(
      (h) =>
        h.location.toUpperCase() === location.toUpperCase() &&
        h.packageType === pkgKey.toUpperCase() &&
        h.hotel === hotelName
    );
    if (hotel) {
      setValue(
        `costingDetails.${pkgKey}.hotelCost` as any,
        hotel.tacSeason * totalRoomCount * numNights
      );
      setValue(`costingDetails.${pkgKey}.roomType` as any, hotel.roomType);
      // Optionally, update cost if travelCost and margin are present
      const travelCost =
        costingDetails?.[pkgKey as "standard" | "comfort" | "luxury"]
          ?.travelCost || 0;
      const margin =
        costingDetails?.[pkgKey as "standard" | "comfort" | "luxury"]?.margin ||
        0;
      setValue(
        `costingDetails.${pkgKey}.cost` as any,
        hotel.tacSeason * totalRoomCount * numNights + travelCost + margin
      );
    }
  }

  // Handle hotelCost, travelCost, margin changes to update final cost
  function handleCostFieldChange(pkgKey: "standard" | "comfort" | "luxury") {
    const hotelCost =
      (watch(`costingDetails.${pkgKey}.hotelCost` as const) as number) || 0;
    const travelCost =
      (watch(`costingDetails.${pkgKey}.travelCost` as const) as number) || 0;
    const margin =
      (watch(`costingDetails.${pkgKey}.margin` as const) as number) || 0;
    setValue(
      `costingDetails.${pkgKey}.cost` as any,
      hotelCost + travelCost + margin
    );
  }

  // React to changes in hotelCost, travelCost, margin
  React.useEffect(() => {
    handleCostFieldChange("standard");
    handleCostFieldChange("comfort");
    handleCostFieldChange("luxury");
    // eslint-disable-next-line
  }, [
    watch("costingDetails.standard.hotelCost"),
    watch("costingDetails.standard.travelCost"),
    watch("costingDetails.standard.margin"),
    watch("costingDetails.comfort.hotelCost"),
    watch("costingDetails.comfort.travelCost"),
    watch("costingDetails.comfort.margin"),
    watch("costingDetails.luxury.hotelCost"),
    watch("costingDetails.luxury.travelCost"),
    watch("costingDetails.luxury.margin"),
  ]);

  // React to changes in itinerary or daysFormat to reset hotel selection/cost
  React.useEffect(() => {
    setValue("costingDetails.standard.hotelName", "");
    setValue("costingDetails.standard.hotelCost", 0);
    setValue("costingDetails.standard.cost", 0);
    setValue("costingDetails.comfort.hotelName", "");
    setValue("costingDetails.comfort.hotelCost", 0);
    setValue("costingDetails.comfort.cost", 0);
    setValue("costingDetails.luxury.hotelName", "");
    setValue("costingDetails.luxury.hotelCost", 0);
    setValue("costingDetails.luxury.cost", 0);
    // eslint-disable-next-line
  }, [JSON.stringify(selectedLocations), numNights, totalRoomCount]);

  // Helper to get travel cost
  function getTravelCost(
    from: string,
    to: string,
    type: string,
    nights: string
  ) {
    const row = travelCostTable.find(
      (r) =>
        r.from === from.toUpperCase() &&
        r.to === to.toUpperCase() &&
        r.type === type.toUpperCase() &&
        r.nights === nights.toUpperCase()
    );
    return row ? row.cost : 0;
  }

  // Add state for margin and discount for each package type
  const [margins, setMargins] = React.useState({
    standard: 0,
    comfort: 0,
    luxury: 0,
  });
  const [discounts, setDiscounts] = React.useState({
    standard: 0,
    comfort: 0,
    luxury: 0,
  });

  // Handler for margin input
  function handleMarginChange(
    pkgKey: "standard" | "comfort" | "luxury",
    value: number
  ) {
    setMargins((prev) => ({ ...prev, [pkgKey]: value }));
  }
  // Handler for discount input
  function handleDiscountChange(
    pkgKey: "standard" | "comfort" | "luxury",
    value: number
  ) {
    setDiscounts((prev) => ({ ...prev, [pkgKey]: value }));
  }

  // Track if travel cost was manually edited for each package type
  const [manualTravelCost, setManualTravelCost] = React.useState({
    standard: false,
    comfort: false,
    luxury: false,
  });

  // Watch relevant client details
  const startLocation = clientDetails?.startLocation || "";
  const endLocation = clientDetails?.endLocation || "";
  const daysFormat = clientDetails?.daysFormat || "";
  const transportType = clientDetails?.transportProvided || "";

  // Helper to extract nights/days string (e.g., '2N3D') from daysFormat
  function getNightsDaysStr(daysFormat: string) {
    const match = daysFormat.match(/(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i);
    if (match) {
      return `${match[1]}N${match[2]}D`;
    }
    return "";
  }

  // Effect to auto-update travel cost unless manually edited or manual entry required
  React.useEffect(() => {
    ["standard", "comfort", "luxury"].forEach((pkgKey) => {
      const key = pkgKey as "standard" | "comfort" | "luxury";
      // Skip manual entry for these transport types
      const manualEntryTypes = ["VAN", "12 SEATER", "21 SEATER", "32 SEATER", "50 SEATER"];
      if (manualEntryTypes.includes(transportType.toUpperCase())) return; // manual entry required
      if (manualTravelCost[key]) return; // skip if manually edited
      const nightsStr = getNightsDaysStr(daysFormat);
      const baseCost = getTravelCost(
        startLocation,
        endLocation,
        transportType,
        nightsStr
      );
      const costWithMargin = baseCost > 0 ? Math.round(baseCost * 1.15) : 0;
      setValue(`costingDetails.${key}.travelCost`, costWithMargin);
    });
    // eslint-disable-next-line
  }, [startLocation, endLocation, daysFormat, transportType]);

  // Handler for travel cost manual edit
  function handleTravelCostChange(
    pkgKey: "standard" | "comfort" | "luxury",
    value: number
  ) {
    setManualTravelCost((prev) => ({ ...prev, [pkgKey]: true }));
    setValue(`costingDetails.${pkgKey}.travelCost`, value);
  }

  // Store Final Cost in costingDetails for each package type
  React.useEffect(() => {
    ["standard", "comfort", "luxury"].forEach((pkgKey) => {
      // Use explicit types for key access
      type CostingKey = "standard" | "comfort" | "luxury";
      const costingKey = pkgKey as CostingKey;
      // Calculate Hotel Cost (average * nights * 1.15)
      const avgHotelCost = getAverageHotelCost(
        packageTypes.find((p) => p.key === costingKey)?.packageType || ""
      );
      const hotelCost = Math.round(avgHotelCost * 1.15);
      // Travel Cost (manual input)
      let travelCost = costingDetails?.[costingKey]?.travelCost || 0;
      // Travel Cost with Margin
      const travelCostWithMargin = Math.round(travelCost * 1.15);
      // Total Cost
      const totalCost = hotelCost + travelCostWithMargin;
      // Profit Margin (user input)
      const profitMargin = margins[costingKey];
      // Discount (user input)
      const discount = discounts[costingKey];
      // Final Cost
      const finalCost = totalCost + profitMargin - discount;
      setValue(`costingDetails.${costingKey}.finalCost`, finalCost);
    });
    // eslint-disable-next-line
  }, [costingDetails, margins, discounts]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Costing Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packageTypes.map(({ key, label, packageType }) => {
          // For now, use the first selected location (if multiple)
          const location = selectedLocations[0] || "";
          const hotelOptions = location
            ? getHotelsFor(location, packageType)
            : [];
          // Use explicit types for key access
          type CostingKey = "standard" | "comfort" | "luxury";
          const costingKey = key as CostingKey;
          const selectedHotel = costingDetails?.[costingKey]?.hotelName || "";
          // Calculate Hotel Cost (average * nights * 1.15)
          const avgHotelCost = getAverageHotelCost(packageType);
          const hotelCost = Math.round(avgHotelCost * 1.15);
          // Travel Cost (manual input)
          let travelCost = costingDetails?.[costingKey]?.travelCost || 0;
          // Travel Cost with Margin
          const travelCostWithMargin = Math.round(travelCost * 1.15);
          // Total Cost
          const totalCost = hotelCost + travelCostWithMargin;
          // Profit Margin (user input)
          const profitMargin = margins[costingKey];
          // Discount (user input)
          const discount = discounts[costingKey];
          // Final Cost
          const finalCost = totalCost + profitMargin - discount;
          const customHotel =
            costingDetails?.[costingKey]?.customHotel || false;
          const customHotelName =
            costingDetails?.[costingKey]?.customHotelName || "";
          return (
            <div
              key={key}
              className="space-y-3 p-3 border rounded-md bg-gray-50"
            >
              <label className="block font-semibold mb-1">
                {label} Package
              </label>
              {/* Custom Hotel Option */}
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`customHotel-${costingKey}`}
                  checked={customHotel}
                  onChange={(e) => {
                    setValue(
                      `costingDetails.${costingKey}.customHotel`,
                      e.target.checked
                    );
                    if (!e.target.checked) {
                      setValue(
                        `costingDetails.${costingKey}.customHotelName`,
                        ""
                      );
                    }
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor={`customHotel-${costingKey}`}
                  className="text-sm font-medium"
                >
                  Use custom hotel
                </label>
              </div>
              {/* Custom Hotel Name Input */}
              {customHotel && (
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Custom Hotel Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2"
                    value={customHotelName}
                    onChange={(e) =>
                      setValue(
                        `costingDetails.${costingKey}.customHotelName`,
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
              {/* Hotel Cost */}
              {!customHotel && (
                <>
                  <label className="block text-sm font-medium mt-2">
                    Hotel Cost (with 15% margin)
                  </label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2 bg-gray-100"
                    value={hotelCost}
                    readOnly
                    tabIndex={-1}
                  />
                </>
              )}
              {customHotel && (
                <>
                  <label className="block text-sm font-medium">
                    Hotel Cost
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2"
                    {...register(`costingDetails.${costingKey}.hotelCost`, {
                      valueAsNumber: true,
                    })}
                    value={costingDetails?.[costingKey]?.hotelCost || 0}
                    onChange={(e) => {
                      setValue(
                        `costingDetails.${costingKey}.hotelCost`,
                        Number(e.target.value)
                      );
                    }}
                  />
                </>
              )}
              {/* Travel Cost */}
              {!customHotel && (
                <>
                  <label className="block text-sm font-medium">
                    Travel Cost
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2"
                    value={travelCost}
                    onChange={(e) =>
                      handleTravelCostChange(costingKey, Number(e.target.value))
                    }
                  />
                </>
              )}
              {/* Travel Cost with Margin */}
              <label className="block text-sm font-medium">
                Travel Cost with Margin
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2 bg-gray-100"
                value={travelCostWithMargin}
                readOnly
                tabIndex={-1}
              />
              {/* Total Cost */}
              <label className="block text-sm font-medium mt-2">
                Total Cost
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2 bg-gray-100"
                value={totalCost}
                readOnly
                tabIndex={-1}
              />
              {/* Profit Margin Input */}
              <label className="block text-sm font-medium">Profit Margin</label>
              <input
                type="number"
                min={0}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2"
                value={profitMargin}
                onChange={(e) =>
                  handleMarginChange(costingKey, Number(e.target.value))
                }
              />
              {/* Discount Input */}
              <label className="block text-sm font-medium">Discount</label>
              <input
                type="number"
                min={0}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2"
                value={discount}
                onChange={(e) =>
                  handleDiscountChange(costingKey, Number(e.target.value))
                }
              />
              {/* Final Cost Display */}
              <label className="block text-sm font-medium">Final Cost</label>
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm mb-2 bg-gray-100"
                value={finalCost}
                readOnly
                tabIndex={-1}
              />
            </div>
          );
        })}
      </div>
      <div>
        <label className="block font-semibold mb-1">Notes</label>
        <textarea
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          placeholder="Additional pricing notes or conditions"
          {...register("costingDetails.notes")}
        />
      </div>
    </div>
  );
};

export default CostingForm;
