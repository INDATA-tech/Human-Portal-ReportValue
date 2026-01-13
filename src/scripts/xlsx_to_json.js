import fs from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Excel file
const inputPath = path.join(__dirname, '../human_translations_DE_4thcol.xlsx');
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

rows.forEach(row => {
    const key = row[0];
    const trValue = row[1] || '';
    const enValue = row[2] || '';
    const deValue = row[3] || '';

    if (!key) return;

    translations[key] = {
        tr: trValue,
        en: enValue,
        de: deValue
    };
});

// Write JSON
const outputPath = path.join(__dirname, '../output_translations.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');

console.log(`JSON created: ${outputPath}`);
console.log(`Total keys: ${Object.keys(translations).length}`);