import fs from 'fs';
import { travelCostData as existingData } from '../src/data/travelCosts.js';
import data from './output.json' assert { type: "json" };

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

const intrastate = [
  "WAYANAD-WAYANAD", "COORG-COORG", "OOTY-OOTY", 
  "COIMBATORE-OOTY", "COIMBATORE-KODAIKANAL", "DINDIGAL-KODAIKANAL", 
  "METTUPALYAM-OOTY", "CALICUT-WAYANAD", "KANNUR-WAYANAD", 
  "MYSORE-COORG", "BANGALORE-COORG"
];

const newData = [];
for (const [vehicleTypeRaw, rows] of Object.entries(data)) {
  let vehicleType = vehicleTypeRaw;
  if (vehicleType === "12 SEATER TT") vehicleType = "12 SEATER";
  if (vehicleType === "21 SEATER MINI BUS") vehicleType = "21 SEATER";
  
  for (const row of rows) {
    const route = row["ROUTE"];
    const payable = row["FINAL COST"];
    if (!route || !payable) continue;

    const match = route.match(/(.+) - (.+) (\d+N\d+D)/i);
    if (!match) continue;

    const from = match[1].trim().toUpperCase();
    const to = match[2].trim().toUpperCase();
    const nightsDay = match[3].trim().toUpperCase();

    const daysMatch = nightsDay.match(/\d+N(\d+)D/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 2;
    const routePair = from + "-" + to;
    
    let permit = vehiclePermit[vehicleTypeRaw] || 1000;
    if (intrastate.includes(routePair)) permit = 0;

    let tolls = 300 * days;
    let perKm = vehiclePerKm[vehicleTypeRaw] || 15;
    let bata = (vehicleTypeRaw === "SEDAN" ? 400 : vehicleTypeRaw === "SUV" ? 500 : 800) * days + 400;

    let remaining = payable - bata - permit - tolls;
    let km = Math.round(remaining / perKm);
    km = Math.round(km / 50) * 50;

    let calculated = (km * perKm) + permit + tolls;
    bata = payable - calculated; 

    if (bata < 0) {
        tolls += bata;
        bata = 0;
        if (tolls < 0) {
            km = Math.max(50, km - 50);
            calculated = (km * perKm) + permit + 0;
            bata = payable - calculated;
            tolls = 0;
        }
    }

    newData.push({ from, to, vehicleType, nightsDay, km, bata, permit, tolls, perKm, payable });
  }
}

const mergedData = [...existingData];

for (const newRow of newData) {
  const existingIdx = mergedData.findIndex(
    e => e.from === newRow.from && e.to === newRow.to && e.vehicleType === newRow.vehicleType && e.nightsDay === newRow.nightsDay
  );
  if (existingIdx !== -1) {
    mergedData[existingIdx] = newRow;
  } else {
    mergedData.push(newRow);
  }
}

let tsCode = "export interface TravelCostEntry {\n";
tsCode += "  from: string;\n";
tsCode += "  to: string;\n";
tsCode += "  vehicleType: string;\n";
tsCode += "  nightsDay: string;\n";
tsCode += "  km: number;\n";
tsCode += "  bata: number;\n";
tsCode += "  permit: number;\n";
tsCode += "  tolls: number;\n";
tsCode += "  perKm: number;\n";
tsCode += "  addInfo?: string;\n";
tsCode += "  payable: number;\n";
tsCode += "}\n\n";

tsCode += "export const travelCostData: TravelCostEntry[] = [\n";

mergedData.forEach(r => {
  let addInfoStr = r.addInfo ? ", addInfo: \"" + r.addInfo + "\"" : "";
  tsCode += "  { from: \"" + r.from + "\", to: \"" + r.to + "\", vehicleType: \"" + r.vehicleType + "\", nightsDay: \"" + r.nightsDay + "\", km: " + r.km + ", bata: " + r.bata + ", permit: " + r.permit + ", tolls: " + r.tolls + ", perKm: " + r.perKm + addInfoStr + ", payable: " + r.payable + " },\n";
});

tsCode += "];\n\n";

const uniqueStarts = [...new Set(mergedData.map(r => r.from))];
const uniqueEnds = [...new Set(mergedData.map(r => r.to))];
const uniqueVehicles = [...new Set(mergedData.map(r => r.vehicleType))];

tsCode += "export const startLocations = " + JSON.stringify(uniqueStarts) + ";\n";
tsCode += "export const endLocations = " + JSON.stringify(uniqueEnds) + ";\n";
tsCode += "export const vehicleTypes = " + JSON.stringify(uniqueVehicles) + ";\n\n";

tsCode += "// Helper function to get travel cost data\n";
tsCode += "export function getTravelCostData(from: string, to: string, vehicleType: string, nightsDay: string): TravelCostEntry | null {\n";
tsCode += "  return travelCostData.find(\n";
tsCode += "    entry => \n";
tsCode += "      entry.from.toUpperCase() === from.toUpperCase() &&\n";
tsCode += "      entry.to.toUpperCase() === to.toUpperCase() &&\n";
tsCode += "      entry.vehicleType.toUpperCase() === vehicleType.toUpperCase() &&\n";
tsCode += "      entry.nightsDay === nightsDay\n";
tsCode += "  ) || null;\n";
tsCode += "}\n\n";

tsCode += "// Helper function to convert days format to nights/days format\n";
tsCode += "export function convertDaysFormatToNightsDay(daysFormat: string): string {\n";
tsCode += "  const match = daysFormat.match(/(\\d+)\\s*Nights?\\s*\\/\\s*(\\d+)\\s*Days?/i);\n";
tsCode += "  if (match) {\n";
tsCode += "    const nights = parseInt(match[1], 10);\n";
tsCode += "    const days = parseInt(match[2], 10);\n";
tsCode += "    return `${nights}N${days}D`;\n";
tsCode += "  }\n";
tsCode += "  return \"1N2D\";\n";
tsCode += "}\n";

fs.writeFileSync('/mnt/data/toorizo/src/data/travelCosts.ts', tsCode);
console.log('Successfully updated travelCosts.ts');
