const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, 'apps/web/public/images'),
  path.join(__dirname, 'apps/web/public/assets/hero_slider'),
  path.join(__dirname, 'apps/web/public/assets/profile')
];

async function compressImage(filePath) {
  const tempPath = filePath + '.tmp';
  const ext = path.extname(filePath).toLowerCase();

  try {
    // Resize width max to 1200px, keep aspect ratio, don't enlarge small images
    let pipeline = sharp(filePath).resize({ width: 1200, withoutEnlargement: true });

    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 75, progressive: true, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: 75, compressionLevel: 8 });
    } else {
      return; // Skip others
    }

    const statsBefore = fs.statSync(filePath);
    await pipeline.toFile(tempPath);
    const statsAfter = fs.statSync(tempPath);

    // Overwrite original
    fs.renameSync(tempPath, filePath);

    const beforeMB = (statsBefore.size / 1024).toFixed(1);
    const afterMB = (statsAfter.size / 1024).toFixed(1);
    
    // Only log if it was actually reduced significantly
    console.log(`[OK] ${path.basename(filePath)} | ${beforeMB} KB -> ${afterMB} KB`);
  } catch (err) {
    console.error(`[Error] processing ${filePath}:`, err.message);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function main() {
  console.log("Starting image compression...");
  let totalSaved = 0;
  
  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isFile()) {
          const statsBefore = fs.statSync(filePath);
          await compressImage(filePath);
          const statsAfter = fs.statSync(filePath);
          totalSaved += (statsBefore.size - statsAfter.size);
      }
    }
  }
  
  console.log(`\nCompression complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

main();
