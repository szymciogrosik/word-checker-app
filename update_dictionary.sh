#!/bin/bash
ZIP_FILE=$1

if [ -z "$ZIP_FILE" ]; then
  echo "Usage: ./update_dictionary.sh sjp-20260901.zip"
  exit 1
fi

URL="https://sjp.pl/sl/growy/$ZIP_FILE"
SOURCES_DIR="_sources"
ASSETS_DIR="src/assets/words"

mkdir -p "$SOURCES_DIR"
mkdir -p "$ASSETS_DIR"

echo "Downloading file from $URL..."
curl -L -o "$SOURCES_DIR/$ZIP_FILE" "$URL"

if [ $? -ne 0 ]; then
  echo "Error downloading the package. Ensure the link is correct."
  exit 1
fi

echo "Extracting ZIP file..."
unzip -o "$SOURCES_DIR/$ZIP_FILE" -d "$SOURCES_DIR"

if [ ! -f "$SOURCES_DIR/slowa.txt" ]; then
  echo "Error: slowa.txt file not found in the extracted package."
  exit 1
fi

echo "Removing old dictionary (clearing cache)..."
rm -f "$ASSETS_DIR"/*.txt

echo "Splitting slowa.txt into alphabetical chunks using Node.js..."
node -e "
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const inputFile = path.join('$SOURCES_DIR', 'slowa.txt');
const outputDir = '$ASSETS_DIR';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile, { encoding: 'utf8' }),
  crlfDelay: Infinity
});

const streams = {};

rl.on('line', (line) => {
  const word = line.trim().toLowerCase();
  if (!word) return;
  
  // Extract first letter
  const firstChar = word.charAt(0);
  
  if (!streams[firstChar]) {
    // Open write stream for this letter
    streams[firstChar] = fs.createWriteStream(path.join(outputDir, firstChar + '.txt'), { flags: 'a', encoding: 'utf8' });
  }
  
  streams[firstChar].write(word + '\n');
});

rl.on('close', () => {
  for (const char in streams) {
    streams[char].end();
  }
  console.log('Done! Dictionary split and saved in ' + outputDir);
});
"

echo "Cleaning up temporary files..."
rm -rf "$SOURCES_DIR"/*

echo "Updating status.json with lastDictionaryUpdateTime..."
node -e "
const fs = require('fs');
const statusPath = 'src/assets/status/status.json';
const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
status.lastDictionaryUpdateTime = pad(now.getDate()) + '-' + pad(now.getMonth() + 1) + '-' + now.getFullYear() + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
console.log('status.json updated: ' + status.lastDictionaryUpdateTime);
"

echo "Finished successfully!"
