import { Client, Storage, Databases } from 'node-appwrite';
import fs from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Appwrite Configuration
const projectId = "665474aa001cd7ecbebd";
const apiKey = "c4aa87b551e3aa52c257f74c13a80f6d2bdc6d9e3ef0c7696d05fd4241956e94915f2746aaabe9311f04ef10c0571b0503c3e6ad60f0323a440a660d1beb5d5716157030bd25a7478fcbec0835083eb2b09c313df0c9ce56c334c01e7dbea72522d6783d93bb935a6be15ca4efb8e76f4e9aa965dd6589c92ce74d455bff382";
const excelBucketId = "69707fd600345284b002";

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint('https://appwrite.anahtarsensin.com/v1')
    .setProject(projectId)
    .setKey(apiKey);

const storage = new Storage(client);
const databases = new Databases(client);

// Database configuration
const DATABASE_ID = '65dc57b1e8322b0426ae';
const TRANSLATIONS_COLLECTION_ID = 'translations';
const TRANSLATIONS_DOCUMENT_ID = 'current';

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
const checkTruncation = (key, trValue, enValue, warnings) => {
    if (!trValue || !enValue) return;

    const trLen = trValue.length;
    const enLen = enValue.length;

    if (trLen > 100 && enLen > 0 && trLen / enLen > 3) {
        warnings.push(`⚠️ Possible truncation: "${key}" - TR: ${trLen} chars, EN: ${enLen} chars`);
    }

    const enTrimmed = enValue.trim();
    if (enTrimmed.length > 50 && !/[.?!:"\n]$/.test(enTrimmed)) {
        warnings.push(`⚠️ EN may be cut off (no ending punctuation): "${key}" - ends with: "...${enTrimmed.slice(-30)}"`);
    }
};

async function fetchAndConvert() {
    try {
        console.log('🔄 Connecting to Appwrite...');

        // List files in the bucket to find the latest Excel file
        const fileList = await storage.listFiles(excelBucketId);

        if (fileList.files.length === 0) {
            console.error('❌ No Excel files found in Appwrite Storage');
            process.exit(1);
        }

        // Sort by creation date to get the latest file
        const sortedFiles = fileList.files.sort((a, b) =>
            new Date(b.$createdAt) - new Date(a.$createdAt)
        );

        const latestFile = sortedFiles[0];
        console.log(`📥 Downloading: ${latestFile.name} (uploaded: ${latestFile.$createdAt})`);

        // Download the file
        const fileContent = await storage.getFileDownload(excelBucketId, latestFile.$id);

        // Convert ArrayBuffer to Buffer
        const buffer = Buffer.from(fileContent);

        console.log('📊 Processing Excel file...');

        // Read the Excel file
        const workbook = XLSX.read(buffer, {
            type: 'buffer',
            cellText: true,
            cellStyles: false,
            cellDates: false,
            raw: true
        });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawRows = XLSX.utils.sheet_to_json(sheet, {
            defval: ''
        });

        console.log(`Sheet name: ${sheetName}`);
        console.log(`Total rows: ${rawRows.length}`);

        const translations = {};
        const warnings = [];

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

            checkTruncation(key, processedTr, processedEn, warnings);

            translations[key] = {
                tr: processedTr,
                en: processedEn,
                de: processedDe,
                pl: processedPl
            };
        });

        // Write JSON to local file
        const outputPath = path.join(__dirname, '../../output_translations.json');
        fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');

        console.log(`\n✅ Local JSON created: ${outputPath}`);
        console.log(`📝 Total keys: ${Object.keys(translations).length}`);

        // Save to Appwrite Database
        console.log('\n💾 Saving to Appwrite Database...');
        const jsonString = JSON.stringify(translations);

        try {
            // Try to update existing document
            await databases.updateDocument(
                DATABASE_ID,
                TRANSLATIONS_COLLECTION_ID,
                TRANSLATIONS_DOCUMENT_ID,
                { data: jsonString }
            );
            console.log('📝 Updated existing translations document in Database');
        } catch (e) {
            // Document doesn't exist, create it
            await databases.createDocument(
                DATABASE_ID,
                TRANSLATIONS_COLLECTION_ID,
                TRANSLATIONS_DOCUMENT_ID,
                { data: jsonString }
            );
            console.log('📝 Created new translations document in Database');
        }

        // Show warnings if any
        if (warnings.length > 0) {
            console.log('\n========== WARNINGS ==========');
            warnings.forEach(w => console.log(w));
            console.log(`\nTotal warnings: ${warnings.length}`);
            console.log('==============================');
        }

        console.log('\n🎉 Translation update completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the function
fetchAndConvert();
