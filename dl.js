const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'apps/web/public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const filesToScan = [
  'apps/web/src/components/GallerySection.jsx',
  'apps/web/src/data/articles.js',
  'apps/web/src/data/destinations.js'
];

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, filename);
    if (fs.existsSync(dest)) return resolve(true);

    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      if (response.statusCode === 302 || response.statusCode === 301) {
          https.get(response.headers.location, res => {
              res.pipe(file);
              file.on('finish', () => { file.close(); resolve(true); });
          }).on('error', err => { fs.unlink(dest, ()=>{}); reject(err); });
      } else {
          response.pipe(file);
          file.on('finish', () => { file.close(); resolve(true); });
      }
    }).on('error', err => {
      fs.unlink(dest, ()=>{});
      reject(err);
    });
  });
}

async function main() {
  const urlRegex = new RegExp("https://images.unsplash.com/photo-[a-zA-Z0-9-]+(?:\\?[a-zA-Z0-9=&_+-]+)?", "g");
  
  for (const filePath of filesToScan) {
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    let modifiedContent = content;
    
    let match;
    const urlMap = new Map();
    
    while ((match = urlRegex.exec(content)) !== null) {
      const fullUrl = match[0];
      const urlObj = new URL(fullUrl);
      const photoIdRegex = /photo-([a-zA-Z0-9-]+)/;
      const idMatch = urlObj.pathname.match(photoIdRegex);
      
      if (idMatch) {
          const photoId = idMatch[1];
          const filename = 'photo-' + photoId + '.jpg';
          urlMap.set(fullUrl, { url: fullUrl, filename: filename });
      }
    }
    
    for (const [originalUrl, info] of urlMap.entries()) {
        console.log('Downloading ' + info.filename + '...');
        try {
            await downloadImage(info.url, info.filename);
            modifiedContent = modifiedContent.split(originalUrl).join('/images/' + info.filename);
        } catch (err) {
            console.error('Failed to download ' + info.url, err);
        }
    }
    
    fs.writeFileSync(fullPath, modifiedContent, 'utf8');
    console.log('Updated ' + filePath);
  }
}

main().catch(console.error);