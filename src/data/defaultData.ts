import { QuotationData } from "../types";
import { addDays } from "date-fns";

// Get today's date for default dates
const today = new Date();
const checkInDefault = addDays(today, 30);
const checkOutDefault = addDays(checkInDefault, 7);

export const defaultQuotationData: QuotationData = {
  clientDetails: {
    name: "",
    contactNumber: "",
    startLocation: "",
    endLocation: "",
    daysFormat: "7 Nights / 8 Days",
    numAdults: 2,
    numChildren: 0,
    childrenAges: "",
    roomAllocations: [
      {
        roomType: "Double",
        roomCount: 1,
      }
    ],
    checkInDate: checkInDefault,
    checkOutDate: checkOutDefault,
    transportProvided: "Sedan",
    packageName: "Wonderful Getaway Package",
  },
  executiveDetails: {
    name: "",
    email: "",
    phone: "",
  },
  customerRequirements: {
    type: 'all',
  },
  inclusions: [
    "Private cab for the entire trip",
    "Daily breakfast is only available in Comfort & Luxury packages.",
    "Toll, parking, and driver allowance",
  ],
  exclusions: [
    "Entry Tickets to Sightseeing Spots: The package does not include entrance fees, camera charges, or activity costs at any monuments, parks, museums, or tourist attractions.",
    "Personal Expenses: Any personal expenses such as laundry, telephone calls, room service, additional food or beverages (beyond the included meals), shopping, tips, or any other costs incurred at the guest's discretion are not covered in the package.",
  ],
  itinerary: [],
  travelCostingDetails: {
    startLocation: "",
    endLocation: "",
    transportType: "Sedan",
    baseTravelCost: 0,
    marginPercentage: 15,
    extraCost: 0,
    finalTravelCost: 0,
    useDummyTransport: false,
    dummyTransportCost: 0,
  },
  hotelCostingDetails: {
    standard: {
      location: "",
      days: 0,
      hotelName: "",
      baseCost: 0,
      marginPercentage: 15,
      extraCost: 0,
      finalCost: 0,
      packageType: "Standard Package",
    },
    comfort: {
      location: "",
      days: 0,
      hotelName: "",
      baseCost: 0,
      marginPercentage: 15,
      extraCost: 0,
      finalCost: 0,
      packageType: "Comfort Package",
    },
    luxury: {
      location: "",
      days: 0,
      hotelName: "",
      baseCost: 0,
      marginPercentage: 15,
      extraCost: 0,
      finalCost: 0,
      packageType: "Luxury Package",
    },
    locationDays: {},
    locationDetails: {},
    skippedLocations: {},
  },
  costingDetails: {
    standard: {
      checkInOut: "3 Nights / 4 Days",
      packageType: "Standard Package",
      hotelName: "",
      hotelCost: 0,
      travelCost: 0,
      margin: 0,
      cost: 999,
      finalCost: 999,
      customHotel: false,
      customHotelName: "",
    },
    comfort: {
      checkInOut: "3 Nights / 4 Days",
      packageType: "Comfort Package",
      hotelName: "",
      hotelCost: 0,
      travelCost: 0,
      margin: 0,
      cost: 1499,
      finalCost: 1499,
      customHotel: false,
      customHotelName: "",
    },
    luxury: {
      checkInOut: "3 Nights / 4 Days",
      packageType: "Luxury Package",
      hotelName: "",
      hotelCost: 0,
      travelCost: 0,
      margin: 0,
      cost: 2499,
      finalCost: 2499,
      customHotel: false,
      customHotelName: "",
    },
    notes: "Price is subject to availability at the time of booking.",
  },
  finalCostingDetails: {
    standard: {
      hotelCost: 0,
      travelCost: 0,
      totalCost: 999,
      packageType: "Standard Package",
    },
    comfort: {
      hotelCost: 0,
      travelCost: 0,
      totalCost: 1499,
      packageType: "Comfort Package",
    },
    luxury: {
      hotelCost: 0,
      travelCost: 0,
      totalCost: 2499,
      packageType: "Luxury Package",
    },
    notes: "Final pricing includes all margins and additional costs.",
  },
  travelGuidelines: `📌 Important Travel Guidelines – TOORIZO

🔐 Booking Process & Payment Terms: To initiate your reservation, kindly confirm your preferred package and hotel category. Upon confirmation, we will issue a GST-compliant invoice for processing. An advance payment of 50% is required to secure the booking, while the remaining 50% can be settled at the time of vehicle boarding.
❎ Trip Cancellation Guidelines: More than 15 days before travel - No cancellation charges. 3 to 14 days before travel - 30% of the total package amount will be charged. Less than 3 days before travel - The booking is non-refundable.
Note: This is a general guideline. Cancellation terms may vary based on hotel policies, season, or other specific circumstances. If cancellation is a possibility, please consult us for detailed terms before confirming your booking.
🌦 Travel Plan Adjustments: In situations such as adverse weather, local unrest, or major events, some itinerary spots may become inaccessible. We appreciate your flexibility in cooperating with any necessary plan changes.
🏨 Partner Services Disclaimer: Some accommodations, transport, or cruise services in your package may be arranged through third-party vendors. Guests are required to follow their policies during the trip.
🧭 Itinerary Fulfillment Notice: While we aim to cover all destinations listed, factors like traffic, time spent at attractions, or hotel check-out timings may affect the final itinerary coverage. We always strive to offer you the best possible experience.`,
  companyDetails: {
    address:
      "Basement cabin, no. 42, 5th cross st, kalaimagal nagar,\nEkkaduthangal, Chennai - 600032",
    phone: "9940415750",
    email: "toorizotravel@gmail.com",
    website: "toorizo.com",
  },
};
