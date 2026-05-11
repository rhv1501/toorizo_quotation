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
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "5N6D", km: 1700, bata: 2700, permit: 500, tolls: 1800, perKm: 10, payable: 22000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "6N7D", km: 1950, bata: 3400, permit: 500, tolls: 2100, perKm: 10, payable: 25500 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SEDAN", nightsDay: "7N8D", km: 2250, bata: 3600, permit: 500, tolls: 2400, perKm: 10, payable: 29000 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "5N6D", km: 1800, bata: 2700, permit: 500, tolls: 1800, perKm: 10, payable: 23000 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "6N7D", km: 2050, bata: 3400, permit: 500, tolls: 2100, perKm: 10, payable: 26500 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "7N8D", km: 2350, bata: 3600, permit: 500, tolls: 2400, perKm: 10, payable: 30000 },
  { from: "WAYANAD", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "1N2D", km: 350, bata: 1050, permit: 0, tolls: 600, perKm: 10, payable: 5150 },
  { from: "WAYANAD", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "2N3D", km: 500, bata: 1750, permit: 0, tolls: 900, perKm: 10, payable: 7650 },
  { from: "WAYANAD", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "3N4D", km: 700, bata: 1950, permit: 0, tolls: 1200, perKm: 10, payable: 10150 },
  { from: "COORG", to: "COORG", vehicleType: "SEDAN", nightsDay: "1N2D", km: 550, bata: 1400, permit: 0, tolls: 600, perKm: 10, payable: 7500 },
  { from: "COORG", to: "COORG", vehicleType: "SEDAN", nightsDay: "2N3D", km: 800, bata: 1600, permit: 0, tolls: 900, perKm: 10, payable: 10500 },
  { from: "COORG", to: "COORG", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1050, bata: 1800, permit: 0, tolls: 1200, perKm: 10, payable: 13500 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "SEDAN", nightsDay: "1N2D", km: 500, bata: 1000, permit: 0, tolls: 600, perKm: 10, payable: 6600 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "SEDAN", nightsDay: "2N3D", km: 750, bata: 1600, permit: 0, tolls: 900, perKm: 10, payable: 10000 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "SEDAN", nightsDay: "3N4D", km: 950, bata: 2000, permit: 0, tolls: 1200, perKm: 10, payable: 12700 },
  { from: "CALICUT", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "1N2D", km: 550, bata: 1400, permit: 0, tolls: 600, perKm: 10, payable: 7500 },
  { from: "CALICUT", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "2N3D", km: 850, bata: 1600, permit: 0, tolls: 900, perKm: 10, payable: 11000 },
  { from: "CALICUT", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1250, bata: 1800, permit: 0, tolls: 1200, perKm: 10, payable: 15500 },
  { from: "KANNUR", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "1N2D", km: 650, bata: 1400, permit: 0, tolls: 600, perKm: 10, payable: 8500 },
  { from: "KANNUR", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "2N3D", km: 950, bata: 1600, permit: 0, tolls: 900, perKm: 10, payable: 12000 },
  { from: "KANNUR", to: "WAYANAD", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1350, bata: 1800, permit: 0, tolls: 1200, perKm: 10, payable: 16500 },
  { from: "BANGALORE", to: "KODAIKANAL", vehicleType: "SEDAN", nightsDay: "2N3D", km: 1450, bata: 1700, permit: 500, tolls: 900, perKm: 10, payable: 17600 },
  { from: "BANGALORE", to: "KODAIKANAL", vehicleType: "SEDAN", nightsDay: "3N4D", km: 1500, bata: 1900, permit: 500, tolls: 1200, perKm: 10, payable: 18600 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "5N6D", km: 1850, bata: 3290, permit: 1000, tolls: 1800, perKm: 15, payable: 33840 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "6N7D", km: 2000, bata: 4240, permit: 1000, tolls: 2100, perKm: 15, payable: 37340 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "SUV", nightsDay: "7N8D", km: 2200, bata: 4440, permit: 1000, tolls: 2400, perKm: 15, payable: 40840 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "5N6D", km: 1900, bata: 3540, permit: 1000, tolls: 1800, perKm: 15, payable: 34840 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "6N7D", km: 2100, bata: 3740, permit: 1000, tolls: 2100, perKm: 15, payable: 38340 },
  { from: "BANGALORE", to: "WAYANAD", vehicleType: "SUV", nightsDay: "7N8D", km: 2250, bata: 4690, permit: 1000, tolls: 2400, perKm: 15, payable: 41840 },
  { from: "WAYANAD", to: "WAYANAD", vehicleType: "SUV", nightsDay: "1N2D", km: 350, bata: 1300, permit: 0, tolls: 600, perKm: 15, payable: 7150 },
  { from: "WAYANAD", to: "WAYANAD", vehicleType: "SUV", nightsDay: "2N3D", km: 500, bata: 2250, permit: 0, tolls: 900, perKm: 15, payable: 10650 },
  { from: "WAYANAD", to: "WAYANAD", vehicleType: "SUV", nightsDay: "3N4D", km: 700, bata: 2450, permit: 0, tolls: 1200, perKm: 15, payable: 14150 },
  { from: "COORG", to: "COORG", vehicleType: "SUV", nightsDay: "1N2D", km: 650, bata: 1150, permit: 0, tolls: 600, perKm: 15, payable: 11500 },
  { from: "COORG", to: "COORG", vehicleType: "SUV", nightsDay: "2N3D", km: 850, bata: 1850, permit: 0, tolls: 900, perKm: 15, payable: 15500 },
  { from: "COORG", to: "COORG", vehicleType: "SUV", nightsDay: "3N4D", km: 1050, bata: 2550, permit: 0, tolls: 1200, perKm: 15, payable: 19500 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "SUV", nightsDay: "1N2D", km: 550, bata: 1150, permit: 0, tolls: 600, perKm: 15, payable: 10000 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "SUV", nightsDay: "2N3D", km: 750, bata: 2350, permit: 0, tolls: 900, perKm: 15, payable: 14500 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "SUV", nightsDay: "3N4D", km: 1000, bata: 2800, permit: 0, tolls: 1200, perKm: 15, payable: 19000 },
  { from: "CALICUT", to: "WAYANAD", vehicleType: "SUV", nightsDay: "1N2D", km: 550, bata: 1150, permit: 0, tolls: 600, perKm: 15, payable: 10000 },
  { from: "CALICUT", to: "WAYANAD", vehicleType: "SUV", nightsDay: "2N3D", km: 750, bata: 2350, permit: 0, tolls: 900, perKm: 15, payable: 14500 },
  { from: "CALICUT", to: "WAYANAD", vehicleType: "SUV", nightsDay: "3N4D", km: 1000, bata: 2800, permit: 0, tolls: 1200, perKm: 15, payable: 19000 },
  { from: "KANNUR", to: "WAYANAD", vehicleType: "SUV", nightsDay: "1N2D", km: 600, bata: 1400, permit: 0, tolls: 600, perKm: 15, payable: 11000 },
  { from: "KANNUR", to: "WAYANAD", vehicleType: "SUV", nightsDay: "2N3D", km: 850, bata: 1850, permit: 0, tolls: 900, perKm: 15, payable: 15500 },
  { from: "KANNUR", to: "WAYANAD", vehicleType: "SUV", nightsDay: "3N4D", km: 1100, bata: 2300, permit: 0, tolls: 1200, perKm: 15, payable: 20000 },
  { from: "BANGALORE", to: "KODAIKANAL", vehicleType: "SUV", nightsDay: "2N3D", km: 1300, bata: 2100, permit: 1000, tolls: 900, perKm: 15, payable: 23500 },
  { from: "BANGALORE", to: "KODAIKANAL", vehicleType: "SUV", nightsDay: "3N4D", km: 1350, bata: 2750, permit: 1000, tolls: 1200, perKm: 15, payable: 25200 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 900, bata: 2000, permit: 1500, tolls: 600, perKm: 20, payable: 22100 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 1050, bata: 2700, permit: 1500, tolls: 900, perKm: 20, payable: 26100 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 1400, bata: 2700, permit: 1500, tolls: 1200, perKm: 20, payable: 33400 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "4N5D", km: 1600, bata: 3500, permit: 1500, tolls: 1500, perKm: 20, payable: 38500 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "5N6D", km: 1800, bata: 4850, permit: 1500, tolls: 1800, perKm: 20, payable: 44150 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "6N7D", km: 2050, bata: 5200, permit: 1500, tolls: 2100, perKm: 20, payable: 49800 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "7N8D", km: 2300, bata: 5550, permit: 1500, tolls: 2400, perKm: 20, payable: 55450 },
  { from: "BANGALORE", to: "COORG", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 900, bata: 1500, permit: 0, tolls: 600, perKm: 20, payable: 20100 },
  { from: "BANGALORE", to: "COORG", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 1050, bata: 2200, permit: 0, tolls: 900, perKm: 20, payable: 24100 },
  { from: "BANGALORE", to: "COORG", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 1350, bata: 3200, permit: 0, tolls: 1200, perKm: 20, payable: 31400 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 650, bata: 1900, permit: 0, tolls: 600, perKm: 20, payable: 15500 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 800, bata: 2600, permit: 0, tolls: 900, perKm: 20, payable: 19500 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 1000, bata: 2800, permit: 0, tolls: 1200, perKm: 20, payable: 24000 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 750, bata: 2400, permit: 0, tolls: 600, perKm: 20, payable: 18000 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 1200, bata: 2100, permit: 0, tolls: 900, perKm: 20, payable: 27000 },
  { from: "COIMBATORE", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 1500, bata: 2800, permit: 0, tolls: 1200, perKm: 20, payable: 34000 },
  { from: "BANGALORE", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 1750, bata: 2600, permit: 1500, tolls: 900, perKm: 20, payable: 40000 },
  { from: "BANGALORE", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 1850, bata: 3300, permit: 1500, tolls: 1200, perKm: 20, payable: 43000 },
  { from: "DINDIGAL", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 400, bata: 2400, permit: 0, tolls: 600, perKm: 20, payable: 11000 },
  { from: "DINDIGAL", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 600, bata: 2100, permit: 0, tolls: 900, perKm: 20, payable: 15000 },
  { from: "DINDIGAL", to: "KODAIKANAL", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 700, bata: 2800, permit: 0, tolls: 1200, perKm: 20, payable: 18000 },
  { from: "METTUPALYAM", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 550, bata: 2400, permit: 0, tolls: 600, perKm: 20, payable: 14000 },
  { from: "METTUPALYAM", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 700, bata: 2600, permit: 0, tolls: 900, perKm: 20, payable: 17500 },
  { from: "METTUPALYAM", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 850, bata: 3300, permit: 0, tolls: 1200, perKm: 20, payable: 21500 },
  { from: "OOTY", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "1N2D", km: 200, bata: 2400, permit: 0, tolls: 600, perKm: 20, payable: 7000 },
  { from: "OOTY", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "2N3D", km: 350, bata: 2600, permit: 0, tolls: 900, perKm: 20, payable: 10500 },
  { from: "OOTY", to: "OOTY", vehicleType: "12 SEATER", nightsDay: "3N4D", km: 550, bata: 2800, permit: 0, tolls: 1200, perKm: 20, payable: 15000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "1N2D", km: 1700, bata: 2000, permit: 2000, tolls: 600, perKm: 25, payable: 47100 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "2N3D", km: 1850, bata: 3750, permit: 2000, tolls: 900, perKm: 25, payable: 52900 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "3N4D", km: 2250, bata: 4350, permit: 2000, tolls: 1200, perKm: 25, payable: 63800 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "4N5D", km: 2500, bata: 5300, permit: 2000, tolls: 1500, perKm: 25, payable: 71300 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "5N6D", km: 2800, bata: 5850, permit: 2000, tolls: 1800, perKm: 25, payable: 79650 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "6N7D", km: 3100, bata: 6400, permit: 2000, tolls: 2100, perKm: 25, payable: 88000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "7N8D", km: 3400, bata: 6950, permit: 2000, tolls: 2400, perKm: 25, payable: 96350 },
  { from: "BANGALORE", to: "COORG", vehicleType: "21 SEATER", nightsDay: "1N2D", km: 1050, bata: 2250, permit: 0, tolls: 600, perKm: 25, payable: 29100 },
  { from: "BANGALORE", to: "COORG", vehicleType: "21 SEATER", nightsDay: "2N3D", km: 1250, bata: 2750, permit: 0, tolls: 900, perKm: 25, payable: 34900 },
  { from: "BANGALORE", to: "COORG", vehicleType: "21 SEATER", nightsDay: "3N4D", km: 1600, bata: 4600, permit: 0, tolls: 1200, perKm: 25, payable: 45800 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "1N2D", km: 650, bata: 2150, permit: 0, tolls: 600, perKm: 25, payable: 19000 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "2N3D", km: 800, bata: 3100, permit: 0, tolls: 900, perKm: 25, payable: 24000 },
  { from: "COIMBATORE", to: "OOTY", vehicleType: "21 SEATER", nightsDay: "3N4D", km: 900, bata: 4300, permit: 0, tolls: 1200, perKm: 25, payable: 28000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "1N2D", km: 2100, bata: 3250, permit: 2500, tolls: 600, perKm: 30, payable: 69350 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "2N3D", km: 2300, bata: 4400, permit: 2500, tolls: 900, perKm: 30, payable: 76800 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "3N4D", km: 2750, bata: 4800, permit: 2500, tolls: 1200, perKm: 30, payable: 91000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "4N5D", km: 3050, bata: 5200, permit: 2500, tolls: 1500, perKm: 30, payable: 100700 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "5N6D", km: 3350, bata: 6725, permit: 2500, tolls: 1800, perKm: 30, payable: 111525 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "6N7D", km: 3650, bata: 8250, permit: 2500, tolls: 2100, perKm: 30, payable: 122350 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "32 SEATER BUS", nightsDay: "7N8D", km: 4000, bata: 8275, permit: 2500, tolls: 2400, perKm: 30, payable: 133175 },
  { from: "BANGALORE", to: "COORG", vehicleType: "32 SEATER BUS", nightsDay: "1N2D", km: 1150, bata: 2250, permit: 0, tolls: 600, perKm: 30, payable: 37350 },
  { from: "BANGALORE", to: "COORG", vehicleType: "32 SEATER BUS", nightsDay: "2N3D", km: 1350, bata: 3400, permit: 0, tolls: 900, perKm: 30, payable: 44800 },
  { from: "BANGALORE", to: "COORG", vehicleType: "32 SEATER BUS", nightsDay: "3N4D", km: 1750, bata: 5300, permit: 0, tolls: 1200, perKm: 30, payable: 59000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "1N2D", km: 2000, bata: 3250, permit: 3000, tolls: 600, perKm: 40, payable: 86850 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "2N3D", km: 2200, bata: 3900, permit: 3000, tolls: 900, perKm: 40, payable: 95800 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "3N4D", km: 2600, bata: 4800, permit: 3000, tolls: 1200, perKm: 40, payable: 113000 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "4N5D", km: 2850, bata: 6200, permit: 3000, tolls: 1500, perKm: 40, payable: 124700 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "5N6D", km: 3100, bata: 8975, permit: 3000, tolls: 1800, perKm: 40, payable: 137775 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "6N7D", km: 3400, bata: 9750, permit: 3000, tolls: 2100, perKm: 40, payable: 150850 },
  { from: "BANGALORE", to: "OOTY", vehicleType: "50 SEATER BUS", nightsDay: "7N8D", km: 3700, bata: 10525, permit: 3000, tolls: 2400, perKm: 40, payable: 163925 },
  { from: "BANGALORE", to: "COORG", vehicleType: "50 SEATER BUS", nightsDay: "1N2D", km: 1050, bata: 2250, permit: 0, tolls: 600, perKm: 40, payable: 44850 },
  { from: "BANGALORE", to: "COORG", vehicleType: "50 SEATER BUS", nightsDay: "2N3D", km: 1200, bata: 4900, permit: 0, tolls: 900, perKm: 40, payable: 53800 },
  { from: "BANGALORE", to: "COORG", vehicleType: "50 SEATER BUS", nightsDay: "3N4D", km: 1600, bata: 5800, permit: 0, tolls: 1200, perKm: 40, payable: 71000 },
];

export const startLocations = ["BANGALORE","WAYANAD","COORG","COIMBATORE","CALICUT","KANNUR","DINDIGAL","METTUPALYAM","OOTY"];
export const endLocations = ["OOTY","WAYANAD","COORG","KODAIKANAL"];
export const vehicleTypes = ["SEDAN","SUV","12 SEATER","21 SEATER","32 SEATER BUS","50 SEATER BUS"];

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
