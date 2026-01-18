import fs from 'fs';
import path from 'path';

// GPL-3.0 license header for TypeScript/JavaScript files
const tsLicenseHeader = `/*
 * This file is part of Pluely.
 *
 * Pluely is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pluely is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pluely.  If not, see <https://www.gnu.org/licenses/>.
 */

`;

// GPL-3.0 license header for Rust files
const rustLicenseHeader = `// This file is part of Pluely.
//
// Pluely is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pluely is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pluely.  If not, see <https://www.gnu.org/licenses/>.

`;

// Function to add license header to a file
function addLicenseHeader(filePath, licenseHeader) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if license header already exists
    if (content.startsWith('/*') || content.startsWith('//')) {
        const firstLine = content.split('\n')[0];
        if (firstLine.includes('GNU General Public License')) {
            console.log(`License header already exists in ${filePath}`);
            return;
        }
    }
    
    // Add the license header
    const newContent = licenseHeader + content;
    fs.writeFileSync(filePath, newContent);
    console.log(`Added license header to ${filePath}`);
}

// Process all .ts files in src directory
function processTsFiles(srcDir) {
    const tsFiles = getAllFiles(srcDir, '.ts');
    tsFiles.forEach(file => {
        addLicenseHeader(file, tsLicenseHeader);
    });
}

// Process all .tsx files in src directory
function processTsxFiles(srcDir) {
    const tsxFiles = getAllFiles(srcDir, '.tsx');
    tsxFiles.forEach(file => {
        addLicenseHeader(file, tsLicenseHeader);
    });
}

// Process all .rs files in src-tauri/src directory
function processRustFiles(tauriSrcDir) {
    const rsFiles = getAllFiles(tauriSrcDir, '.rs');
    rsFiles.forEach(file => {
        addLicenseHeader(file, rustLicenseHeader);
    });
}

// Helper function to get all files with a specific extension in a directory and its subdirectories
function getAllFiles(dir, extension) {
    let results = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, extension));
        } else if (path.extname(fullPath) === extension) {
            results.push(fullPath);
        }
    });

    return results;
}

// Main execution
const srcDir = './src';
const tauriSrcDir = './src-tauri/src';

console.log('Adding license headers to TypeScript files...');
processTsFiles(srcDir);

console.log('Adding license headers to TSX files...');
processTsxFiles(srcDir);

console.log('Adding license headers to Rust files...');
processRustFiles(tauriSrcDir);

console.log('License headers added successfully!');