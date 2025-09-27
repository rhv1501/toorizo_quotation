export interface RoomAllocation {
  roomType: string;
  roomCount: number;
}

export interface ClientDetails {
  name: string;
  contactNumber?: string;
  startLocation: string;
  endLocation: string;
  daysFormat: string;
  numAdults: number;
  numChildren: number;
  childrenAges: string;
  roomAllocations: RoomAllocation[];
  checkInDate: Date | null;
  checkOutDate: Date | null;
  transportProvided: string;
  packageName: string;
}

export interface ExecutiveDetails {
  name: string;
  email: string;
  phone: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  location: string;
  isTravelAlone: boolean;
}

export interface CostingDetails {
  [key: string]:
    | {
        checkInOut: string;
        packageType: string;
        hotelName: string;
        hotelCost: number;
        travelCost: number;
        margin: number;
        cost: number;
        finalCost: number;
        customHotel: boolean;
        customHotelName: string;
      }
    | string;
  standard: {
    checkInOut: string;
    packageType: string;
    hotelName: string;
    hotelCost: number;
    travelCost: number;
    margin: number;
    cost: number;
    finalCost: number;
    customHotel: boolean;
    customHotelName: string;
  };
  comfort: {
    checkInOut: string;
    packageType: string;
    hotelName: string;
    hotelCost: number;
    travelCost: number;
    margin: number;
    cost: number;
    finalCost: number;
    customHotel: boolean;
    customHotelName: string;
  };
  luxury: {
    checkInOut: string;
    packageType: string;
    hotelName: string;
    hotelCost: number;
    travelCost: number;
    margin: number;
    cost: number;
    finalCost: number;
    customHotel: boolean;
    customHotelName: string;
  };
  notes: string;
}

export interface CompanyDetails {
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface CustomerRequirements {
  type: 'all' | 'rooms_only' | 'travel_only';
}

export interface TravelCostingDetails {
  startLocation: string;
  endLocation: string;
  transportType: string;
  baseTravelCost: number;
  marginPercentage: number;
  extraCost: number;
  finalTravelCost: number;
  useDummyTransport: boolean;
  dummyTransportCost: number;
}

export interface LocationDetails {
  days: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
}

export interface HotelCostingDetails {
  standard: {
    location: string;
    days: number;
    hotelName: string;
    baseCost: number;
    marginPercentage: number;
    extraCost: number;
    finalCost: number;  
    packageType: string;
  };
  comfort: {
    location: string;
    days: number;
    hotelName: string;
    baseCost: number;
    marginPercentage: number;
    extraCost: number;
    finalCost: number;
    packageType: string;
  };
  luxury: {
    location: string;
    days: number;
    hotelName: string;
    baseCost: number;
    marginPercentage: number;
    extraCost: number;
    finalCost: number;
    packageType: string;
  };
  locationDays?: { [location: string]: number };
  locationDetails?: { [location: string]: LocationDetails };
  skippedLocations?: { [location: string]: boolean };
}

export interface FinalCostingDetails {
  [key: string]:
    | {
        hotelCost: number;
        travelCost: number;
        totalCost: number;
        packageType: string;
      }
    | string;
  standard: {
    hotelCost: number;
    travelCost: number;
    totalCost: number;
    packageType: string;
  };
  comfort: {
    hotelCost: number;
    travelCost: number;
    totalCost: number;
    packageType: string;
  };
  luxury: {
    hotelCost: number;
    travelCost: number;
    totalCost: number;
    packageType: string;
  };
  notes: string;
}

export interface QuotationData {
  clientDetails: ClientDetails;
  executiveDetails: ExecutiveDetails;
  customerRequirements: CustomerRequirements;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  travelCostingDetails: TravelCostingDetails;
  hotelCostingDetails: HotelCostingDetails;
  costingDetails: CostingDetails;
  finalCostingDetails: FinalCostingDetails;
  travelGuidelines: string;
  companyDetails: CompanyDetails;
}
