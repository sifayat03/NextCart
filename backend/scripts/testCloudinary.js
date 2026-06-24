require('dotenv').config();
const cloudinary = require('../config/cloudinary');

async function testUpload() {
  try {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png';
    console.log('Uploading test image to Cloudinary...');
    const res = await cloudinary.uploader.upload(url, { folder: 'nextcart_test' });
    console.log('Upload successful:', res.secure_url);
    process.exit(0);
  } catch (err) {
    console.error('Upload failed:', err.message || err);
    process.exit(2);
  }
}

testUpload();
