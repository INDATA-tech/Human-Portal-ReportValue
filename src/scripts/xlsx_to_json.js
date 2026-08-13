import fs from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Excel file with raw strings option to prevent truncation
const inputPath = path.join(__dirname, '../../human_translations.xlsx');
const fileBuffer = fs.readFileSync(inputPath);
const workbook = XLSX.read(fileBuffer, {
    type: 'buffer',
    cellText: true,  // Get raw text to prevent truncation
    cellStyles: false,
    cellDates: false,
    raw: true  // Get raw values
});

// Get the first sheet (or adjust if sheet name is different)
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawRows = XLSX.utils.sheet_to_json(sheet, {
    defval: ''
});

console.log(`Sheet name: ${sheetName}`);
console.log(`Total rows: ${rawRows.length}`);

// New structure: { key: { tr: "...", en: "...", de: "...", pl: "..." } }
const translations = {};
const warnings = [];

// Helper function to convert literal \n text to actual newline
const processValue = (val) => {
    if (val === null || val === undefined) return '';
    let strVal = String(val);
    
    // Replace special hyphens with standard hyphens
    strVal = strVal
        .replace(/\u00ad/g, '-')   // Soft Hyphen
        .replace(/\u2011/g, '-')   // Non-breaking Hyphen
        .replace(/\u2212/g, '-');  // Minus Sign
        
    return strVal.replace(/\\n/g, '\n');
};

// Helper function to check for potential truncation
const checkTruncation = (key, trValue, enValue) => {
    if (!trValue || !enValue) return;

    const trLen = trValue.length;
    const enLen = enValue.length;

    // If TR is significantly longer than EN (more than 3x), might be truncated
    if (trLen > 100 && enLen > 0 && trLen / enLen > 3) {
        warnings.push(`⚠️ Possible truncation: "${key}" - TR: ${trLen} chars, EN: ${enLen} chars`);
    }

    // Check if EN ends mid-sentence (no proper punctuation at end)
    const enTrimmed = enValue.trim();
    if (enTrimmed.length > 50 && !/[.?!:"\n]$/.test(enTrimmed)) {
        warnings.push(`⚠️ EN may be cut off (no ending punctuation): "${key}" - ends with: "...${enTrimmed.slice(-30)}"`);
    }
};

rawRows.forEach(row => {
    const keyProp = Object.keys(row).find(k => String(k).trim().toUpperCase() === 'KEY');
    const key = keyProp ? String(row[keyProp]).trim() : '';

    if (!key) return;

    const getVal = (langCode) => {
        const prop = Object.keys(row).find(k => String(k).trim().toUpperCase() === langCode.toUpperCase());
        return prop ? processValue(row[prop]) : '';
    };

    const processedTr = getVal('TR');
    const processedEn = getVal('EN');
    const processedDe = getVal('DE');
    const processedPl = getVal('PL');

    // Check for potential truncation issues
    checkTruncation(key, processedTr, processedEn);

    translations[key] = {
        tr: processedTr,
        en: processedEn,
        de: processedDe,
        pl: processedPl
    };
});

// Write JSON
const outputPath = path.join(__dirname, '../../output_translations.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');

console.log(`JSON created: ${outputPath}`);
console.log(`Total keys: ${Object.keys(translations).length}`);

// Show warnings if any
if (warnings.length > 0) {
    console.log('\n========== WARNINGS ==========');
    warnings.forEach(w => console.log(w));
    console.log(`\nTotal warnings: ${warnings.length}`);
    console.log('==============================');
}