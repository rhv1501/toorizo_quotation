const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('/mnt/data/toorizo/TRANSPORT COST .xlsx');
const result = {};

workbook.SheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  result[sheetName] = xlsx.utils.sheet_to_json(worksheet);
});

console.log(JSON.stringify(result, null, 2));
