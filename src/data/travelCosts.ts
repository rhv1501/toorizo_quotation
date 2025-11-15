export interface TravelCostEntry {
  from: string;
  to: string;
  vehicleType: string;
  nightsDay: string;
  km: number;
  bata: number;
  permit: number;
  tolls: number;
  perKm: number;
  addInfo?: string;
  payable: number;
}

export const travelCostData: TravelCostEntry[] = [
  // BANGALORE to OOTY - Updated pricing
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "1N2D", km: 750, bata: 1200, permit: 500, tolls: 1000, perKm: 10, payable: 10200 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "2N3D", km: 900, bata: 1600, permit: 500, tolls: 1200, perKm: 10, payable: 12300 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1200, bata: 2000, permit: 500, tolls: 1500, perKm: 10, payable: 16000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "4N5D", km: 1500, bata: 2400, permit: 500, tolls: 1800, perKm: 10, payable: 19700 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "1N2D", km: 750, bata: 1500, permit: 1000, tolls: 1000, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 14750 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "2N3D", km: 900, bata: 2000, permit: 1000, tolls: 1200, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 17700 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "3N4D", km: 1200, bata: 2500, permit: 1000, tolls: 1500, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 23000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "4N5D", km: 1500, bata: 3000, permit: 1000, tolls: 1800, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 28300 },
  
  // BANGALORE to COORG - Updated pricing
  { from: "BANGALORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "1N2D", km: 750, bata: 1200, permit: 0, tolls: 1000, perKm: 10, payable: 9700 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "2N3D", km: 900, bata: 1600, permit: 0, tolls: 1200, perKm: 10, payable: 11800 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1200, bata: 2000, permit: 0, tolls: 1500, perKm: 10, payable: 15500 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "4N5D", km: 1500, bata: 2400, permit: 0, tolls: 1800, perKm: 10, payable: 19200 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SUV", nightsDay: "1N2D", km: 750, bata: 1500, permit: 1000, tolls: 1000, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 13750 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SUV", nightsDay: "2N3D", km: 900, bata: 2000, permit: 1000, tolls: 1200, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 16700 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SUV", nightsDay: "3N4D", km: 1200, bata: 2500, permit: 1000, tolls: 1500, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 22000 },
  { from: "BANGALORE", to: "COORG", vehicleType: "SUV", nightsDay: "4N5D", km: 1500, bata: 3000, permit: 1000, tolls: 1800, perKm: 15, addInfo: "NOVA 16RS, CRY", payable: 27300 },
  
  // MYSORE to OOTY - Updated pricing
  { from: "MYSORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "1N2D", km: 500, bata: 1050, permit: 500, tolls: 850, perKm: 12, payable: 8400 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "2N3D", km: 750, bata: 1400, permit: 500, tolls: 1350, perKm: 12, payable: 12250 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1000, bata: 1750, permit: 500, tolls: 1850, perKm: 12, payable: 16100 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "4N5D", km: 1250, bata: 2100, permit: 500, tolls: 2350, perKm: 12, payable: 19950 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SUV", nightsDay: "1N2D", km: 500, bata: 1200, permit: 1000, tolls: 850, perKm: 16, payable: 11050 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SUV", nightsDay: "2N3D", km: 750, bata: 1600, permit: 1000, tolls: 1350, perKm: 16, payable: 15950 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SUV", nightsDay: "3N4D", km: 1000, bata: 2000, permit: 1000, tolls: 1850, perKm: 16, payable: 20850 },
  { from: "MYSORE", to: "OOTY", vehicleType: "SUV", nightsDay: "4N5D", km: 1250, bata: 2400, permit: 1000, tolls: 2350, perKm: 16, payable: 25750 },
  
  // MYSORE to COORG - Updated pricing
  { from: "MYSORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "1N2D", km: 500, bata: 1050, permit: 0, tolls: 850, perKm: 12, payable: 7900 },
  { from: "MYSORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "2N3D", km: 750, bata: 1400, permit: 0, tolls: 1350, perKm: 12, payable: 11750 },
  { from: "MYSORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1000, bata: 1750, permit: 0, tolls: 1850, perKm: 12, payable: 15600 },
  { from: "MYSORE", to: "COORG", vehicleType: "SEDAN", nightsDay: "4N5D", km: 1250, bata: 2100, permit: 0, tolls: 2350, perKm: 12, payable: 19450 },
  { from: "MYSORE", to: "COORG", vehicleType: "SUV", nightsDay: "1N2D", km: 500, bata: 1200, permit: 0, tolls: 850, perKm: 16, payable: 10050 },
  { from: "MYSORE", to: "COORG", vehicleType: "SUV", nightsDay: "2N3D", km: 750, bata: 1600, permit: 0, tolls: 1350, perKm: 16, payable: 14950 },
  { from: "MYSORE", to: "COORG", vehicleType: "SUV", nightsDay: "3N4D", km: 1000, bata: 2000, permit: 0, tolls: 1850, perKm: 16, payable: 19850 },
  { from: "MYSORE", to: "COORG", vehicleType: "SUV", nightsDay: "4N5D", km: 1250, bata: 2400, permit: 0, tolls: 2350, perKm: 16, payable: 24750 },

  // NEW: COIMBATORE to OOTY
  { from: "COIMBATORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "1N2D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 9200 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "2N3D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 11300 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "3N4D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 13900 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "SUV", nightsDay: "1N2D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 12700 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "SUV", nightsDay: "2N3D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 15800 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "SUV", nightsDay: "3N4D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 18900 },

  // NEW: METTUPALAYAM to OOTY
  { from: "METTUPALAYAM", to: "OOTY", vehicleType: "SEDAN", nightsDay: "1N2D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 7700 },
  { from: "METTUPALAYAM", to: "OOTY", vehicleType: "SEDAN", nightsDay: "2N3D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 9300 },
  { from: "METTUPALAYAM", to: "OOTY", vehicleType: "SEDAN", nightsDay: "3N4D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 11400 },
  { from: "METTUPALAYAM", to: "OOTY", vehicleType: "SUV", nightsDay: "1N2D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 9700 },
  { from: "METTUPALAYAM", to: "OOTY", vehicleType: "SUV", nightsDay: "2N3D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 12800 },
  { from: "METTUPALAYAM", to: "OOTY", vehicleType: "SUV", nightsDay: "3N4D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, payable: 15900 },

  // NEW: BANGALORE to WAYANAD
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "1N2D", km: 750, bata: 1200, permit: 500, tolls: 1700, perKm: 10, payable: 10900 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "2N3D", km: 900, bata: 1600, permit: 500, tolls: 1900, perKm: 10, payable: 13000 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1200, bata: 2000, permit: 500, tolls: 2200, perKm: 10, payable: 16700 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "4N5D", km: 1500, bata: 2400, permit: 500, tolls: 2500, perKm: 10, payable: 20400 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "1N2D", km: 750, bata: 1500, permit: 1000, tolls: 1700, perKm: 15, payable: 15450 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "2N3D", km: 900, bata: 2000, permit: 1000, tolls: 1900, perKm: 15, payable: 18400 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "3N4D", km: 1200, bata: 2500, permit: 1000, tolls: 2200, perKm: 15, payable: 23700 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "4N5D", km: 1500, bata: 3000, permit: 1000, tolls: 2500, perKm: 15, payable: 29000 },

  // NEW: MYSORE to WAYANAD
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "1N2D", km: 500, bata: 1050, permit: 500, tolls: 850, perKm: 12, payable: 8400 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "2N3D", km: 750, bata: 1400, permit: 500, tolls: 1350, perKm: 12, payable: 12250 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1000, bata: 1750, permit: 500, tolls: 1850, perKm: 12, payable: 16100 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "4N5D", km: 1250, bata: 2100, permit: 500, tolls: 2350, perKm: 12, payable: 19950 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "1N2D", km: 500, bata: 1200, permit: 1000, tolls: 850, perKm: 16, payable: 11050 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "2N3D", km: 750, bata: 1600, permit: 1000, tolls: 1350, perKm: 16, payable: 15950 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "3N4D", km: 1000, bata: 2000, permit: 1000, tolls: 1850, perKm: 16, payable: 20850 },
  { from: "MYSORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "4N5D", km: 1250, bata: 2400, permit: 1000, tolls: 2350, perKm: 16, payable: 25750 },

  // NEW: OOTY to OOTY (Local transportation within Ooty) - costs from CostingForm without 15% margin
  { from: "OOTY", to: "OOTY", vehicleType: "SEDAN", nightsDay: "1N2D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 2700 },
  { from: "OOTY", to: "OOTY", vehicleType: "SEDAN", nightsDay: "2N3D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 6300 },
  { from: "OOTY", to: "OOTY", vehicleType: "SEDAN", nightsDay: "3N4D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 8400 },
  { from: "OOTY", to: "OOTY", vehicleType: "SEDAN", nightsDay: "4N5D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 10500 },
  { from: "OOTY", to: "OOTY", vehicleType: "SUV", nightsDay: "1N2D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 6200 },
  { from: "OOTY", to: "OOTY", vehicleType: "SUV", nightsDay: "2N3D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 9300 },
  { from: "OOTY", to: "OOTY", vehicleType: "SUV", nightsDay: "3N4D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 13400 },
  { from: "OOTY", to: "OOTY", vehicleType: "SUV", nightsDay: "4N5D", km: 0, bata: 0, permit: 0, tolls: 0, perKm: 0, addInfo: "Local sightseeing - base cost", payable: 6800 },
];

export const startLocations = ["BANGALORE", "MYSORE", "COIMBATORE", "METTUPALAYAM", "OOTY"];
export const endLocations = ["OOTY", "COORG", "WAYANAD"];
export const vehicleTypes = ["SEDAN", "SUV", "12 SEATER", "21 SEATER", "32 SEATER", "50 SEATER"];

// Helper function to get travel cost data
export function getTravelCostData(from: string, to: string, vehicleType: string, nightsDay: string): TravelCostEntry | null {
  return travelCostData.find(
    entry => 
      entry.from.toUpperCase() === from.toUpperCase() &&
      entry.to.toUpperCase() === to.toUpperCase() &&
      entry.vehicleType.toUpperCase() === vehicleType.toUpperCase() &&
      entry.nightsDay === nightsDay
  ) || null;
}

// Helper function to convert days format to nights/days format
export function convertDaysFormatToNightsDay(daysFormat: string): string {
  const match = daysFormat.match(/(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i);
  if (match) {
    const nights = parseInt(match[1], 10);
    const days = parseInt(match[2], 10);
    return `${nights}N${days}D`;
  }
  return "1N2D";
} 