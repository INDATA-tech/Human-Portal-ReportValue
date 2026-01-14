import fs from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Excel file
const inputPath = path.join(__dirname, '../../finally.xlsx');
const fileBuffer = fs.readFileSync(inputPath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

// Get the first sheet (or adjust if sheet name is different)
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log(`Sheet name: ${sheetName}`);
console.log(`Total rows: ${data.length}`);

// Skip header row
const rows = data.slice(1);

// New structure: { key: { tr: "...", en: "...", de: "..." } }
const translations = {};

// Helper function to convert literal \n text to actual newline
const processValue = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/\\n/g, '\n');
};

rows.forEach(row => {
    const key = row[2];      // Column C - Key
    const trValue = row[3] || '';  // Column D - TR
    const enValue = row[4] || '';  // Column E - EN
    const deValue = row[5] || '';  // Column F - DE

    if (!key) return;

    translations[key] = {
        tr: processValue(trValue),
        en: processValue(enValue),
        de: processValue(deValue)
    };
});

// Write JSON
const outputPath = path.join(__dirname, '../output_translations.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');

console.log(`JSON created: ${outputPath}`);
console.log(`Total keys: ${Object.keys(translations).length}`);