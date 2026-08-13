import { Client, Storage, Databases } from 'node-appwrite';
import * as XLSX from 'xlsx';

// Appwrite Configuration
const APPWRITE_ENDPOINT = 'https://appwrite.anahtarsensin.com/v1';
const PROJECT_ID = '665474aa001cd7ecbebd';
const API_KEY = 'c4aa87b551e3aa52c257f74c13a80f6d2bdc6d9e3ef0c7696d05fd4241956e94915f2746aaabe9311f04ef10c0571b0503c3e6ad60f0323a440a660d1beb5d5716157030bd25a7478fcbec0835083eb2b09c313df0c9ce56c334c01e7dbea72522d6783d93bb935a6be15ca4efb8e76f4e9aa965dd6589c92ce74d455bff382';
const EXCEL_BUCKET_ID = '69707fd600345284b002';
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

export default async ({ req, res, log, error }) => {
    try {
        log('🔄 Excel to JSON converter triggered');

        // Initialize Appwrite Client
        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(PROJECT_ID)
            .setKey(API_KEY);

        const storage = new Storage(client);
        const databases = new Databases(client);

        // Get the file ID from the event
        let fileId;
        let fileName;

        // Check if triggered by event or manual
        // Appwrite may send body as parsed object or raw string
        if (req.body) {
            let eventData = null;

            if (typeof req.body === 'object' && req.body.$id) {
                // Already parsed object (Appwrite runtime v2+)
                eventData = req.body;
                log('📨 Event received (object body)');
            } else if (typeof req.body === 'string' && req.body.trim()) {
                try {
                    eventData = JSON.parse(req.body);
                    log('📨 Event received (string body, parsed)');
                } catch {
                    // Not JSON - might be a raw fileId for manual trigger
                    fileId = req.body.trim();
                    log(`📨 Manual trigger with fileId: ${fileId}`);
                }
            }

            if (eventData && eventData.$id) {
                fileId = eventData.$id;
                fileName = eventData.name || '';

                // Validate bucket - only process files from our Excel bucket
                if (eventData.bucketId && eventData.bucketId !== EXCEL_BUCKET_ID) {
                    log(`⏭️ Skipping: file from different bucket (${eventData.bucketId})`);
                    return res.json({ success: false, error: 'Wrong bucket' });
                }

                log(`📄 Event file: ${fileName} (${fileId})`);
            }
        }

        // If no fileId from event, get the latest file from bucket
        if (!fileId) {
            log('📋 No event data, getting latest file from bucket...');
            const fileList = await storage.listFiles(EXCEL_BUCKET_ID);

            if (fileList.files.length === 0) {
                error('❌ No Excel files found in bucket');
                return res.json({ success: false, error: 'No files found' });
            }

            const sortedFiles = fileList.files.sort((a, b) =>
                new Date(b.$createdAt) - new Date(a.$createdAt)
            );
            fileId = sortedFiles[0].$id;
            fileName = sortedFiles[0].name;
            log(`📄 Using latest file: ${fileName}`);
        }

        // Validate file extension
        const ext = (fileName || '').toLowerCase();
        if (ext && !ext.endsWith('.xlsx') && !ext.endsWith('.xls')) {
            log(`⏭️ Skipping non-Excel file: ${fileName}`);
            return res.json({ success: false, error: 'Not an Excel file' });
        }

        // Download the Excel file
        log(`📥 Downloading file: ${fileId}`);
        const fileContent = await storage.getFileDownload(EXCEL_BUCKET_ID, fileId);
        const buffer = Buffer.from(fileContent);

        // Parse Excel
        log('📊 Parsing Excel file...');
        const workbook = XLSX.read(buffer, {
            type: 'buffer',
            cellText: true,
            cellStyles: false,
            cellDates: false,
            raw: true
        });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            raw: true,
            defval: ''
        });

        log(`Sheet: ${sheetName}, Rows: ${data.length}`);

        // Skip header row and build translations object
        const rows = data.slice(1);
        const translations = {};

        rows.forEach(row => {
            const key = row[2];      // Column C - Key
            const trValue = row[3] || '';  // Column D - TR
            const enValue = row[4] || '';  // Column E - EN
            const deValue = row[5] || '';  // Column F - DE
            const plValue = row[6] || '';  // Column G - PL

            if (!key) return;

            translations[key] = {
                tr: processValue(trValue),
                en: processValue(enValue),
                de: processValue(deValue),
                pl: processValue(plValue)
            };
        });

        const totalKeys = Object.keys(translations).length;
        log(`✅ Parsed ${totalKeys} translation keys`);

        // Save to Database
        log('💾 Saving to Database...');
        const jsonString = JSON.stringify(translations);

        try {
            // Try to update existing document
            await databases.updateDocument(
                DATABASE_ID,
                TRANSLATIONS_COLLECTION_ID,
                TRANSLATIONS_DOCUMENT_ID,
                { data: jsonString }
            );
            log('📝 Updated existing translations document');
        } catch (e) {
            // Document doesn't exist, create it
            await databases.createDocument(
                DATABASE_ID,
                TRANSLATIONS_COLLECTION_ID,
                TRANSLATIONS_DOCUMENT_ID,
                { data: jsonString }
            );
            log('📝 Created new translations document');
        }

        log('🎉 Translation sync completed successfully!');

        return res.json({
            success: true,
            totalKeys: totalKeys,
            message: 'Translations synced to database'
        });

    } catch (err) {
        error(`❌ Error: ${err.message}`);
        return res.json({ success: false, error: err.message });
    }
};
