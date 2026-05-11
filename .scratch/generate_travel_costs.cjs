const fs = require('fs');

const data = require('./output.json');

const vehiclePerKm = {
  "SEDAN": 10,
  "SUV": 15,
  "12 SEATER TT": 20,
  "21 SEATER MINI BUS": 25,
  "32 SEATER BUS": 30,
  "50 SEATER BUS": 40
};

const vehiclePermit = {
  "SEDAN": 500,
  "SUV": 1000,
  "12 SEATER TT": 1500,
  "21 SEATER MINI BUS": 2000,
  "32 SEATER BUS": 2500,
  "50 SEATER BUS": 3000
};

const vehicleBataPerDay = {
  "SEDAN": 400,
  "SUV": 500,
  "12 SEATER TT": 600,
  "21 SEATER MINI BUS": 800,
  "32 SEATER BUS": 1000,
  "50 SEATER BUS": 1200
};

// Intrastate pairs where permit is 0
const intrastate = [
  "WAYANAD-WAYANAD",
  "COORG-COORG",
  "OOTY-OOTY",
  "COIMBATORE-OOTY",
  "COIMBATORE-KODAIKANAL",
  "DINDIGAL-KODAIKANAL",
  "METTUPALYAM-OOTY",
  "CALICUT-WAYANAD",
  "KANNUR-WAYANAD",
  "MYSORE-COORG",
  "BANGALORE-COORG"
];

const results = [];

// Iterate through the JSON
for (const [vehicleTypeRaw, rows] of Object.entries(data)) {
  let vehicleType = vehicleTypeRaw;
  if (vehicleType === "12 SEATER TT") vehicleType = "12 SEATER";
  if (vehicleType === "21 SEATER MINI BUS") vehicleType = "21 SEATER";
  
  for (const row of rows) {
    const route = row["ROUTE"];
    const payable = row["FINAL COST"];
    if (!route || !payable) continue;

    // Parse route: "BANGALORE - OOTY 5N6D"
    const match = route.match(/(.+) - (.+) (\d+N\d+D)/i);
    if (!match) continue;

    const from = match[1].trim().toUpperCase();
    const to = match[2].trim().toUpperCase();
    const nightsDay = match[3].trim().toUpperCase();

    // Calculate Days
    const daysMatch = nightsDay.match(/\d+N(\d+)D/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 2;

    const routePair = `${from}-${to}`;
    
    // Check intrastate
    let permit = vehiclePermit[vehicleTypeRaw] || 1000;
    if (intrastate.includes(routePair)) {
      permit = 0;
    }

    let bata = (vehicleBataPerDay[vehicleTypeRaw] || 500) * days;
    // Add base bata
    bata += (vehicleTypeRaw === "SEDAN" ? 400 : vehicleTypeRaw === "SUV" ? 500 : 800);

    let tolls = 300 * days;
    let perKm = vehiclePerKm[vehicleTypeRaw] || 15;

    // Calculate km
    let remaining = payable - bata - permit - tolls;
    let km = Math.round(remaining / perKm);

    // Make sure km is a clean multiple of 50
    km = Math.round(km / 50) * 50;

    // Recalculate to match payable exactly by adjusting bata
    let calculated = (km * perKm) + permit + tolls;
    bata = payable - calculated; // Any difference goes to bata

    // If bata is negative, adjust tolls
    if (bata < 0) {
        tolls += bata; // reduce tolls
        bata = 0;
        if (tolls < 0) {
            km = Math.max(50, km - 50);
            calculated = (km * perKm) + permit + 0;
            bata = payable - calculated;
            tolls = 0;
        }
    }

    results.push({
      from,
      to,
      vehicleType,
      nightsDay,
      km,
      bata,
      permit,
      tolls,
      perKm,
      payable
    });
  }
}

// Generate TypeScript
let tsCode = `export interface TravelCostEntry {
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
`;

results.forEach(r => {
  tsCode += `  { from: "${r.from}", to: "${r.to}", vehicleType: "${r.vehicleType}", nightsDay: "${r.nightsDay}", km: ${r.km}, bata: ${r.bata}, permit: ${r.permit}, tolls: ${r.tolls}, perKm: ${r.perKm}, payable: ${r.payable} },\n`;
});

tsCode += `];\n\n`;

const uniqueStarts = [...new Set(results.map(r => r.from))];
const uniqueEnds = [...new Set(results.map(r => r.to))];
const uniqueVehicles = [...new Set(results.map(r => r.vehicleType))];

tsCode += `export const startLocations = ${JSON.stringify(uniqueStarts)};\n`;
tsCode += `export const endLocations = ${JSON.stringify(uniqueEnds)};\n`;
tsCode += `export const vehicleTypes = ${JSON.stringify(uniqueVehicles)};\n\n`;

tsCode += `// Helper function to get travel cost data
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
  const match = daysFormat.match(/(\\d+)\\s*Nights?\\s*\\/\\s*(\\d+)\\s*Days?/i);
  if (match) {
    const nights = parseInt(match[1], 10);
    const days = parseInt(match[2], 10);
    return \`\${nights}N\${days}D\`;
  }
  return "1N2D";
}
`;

fs.writeFileSync('/mnt/data/toorizo/.scratch/newTravelCosts.ts', tsCode);
console.log('Generated newTravelCosts.ts');
