const axios = require('axios');

const fs = require('fs');
const path = require('path');

const STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
const ACCESS_KEY = process.env.BUNNY_ACCESS_KEY;
const CDN_URL = process.env.BUNNY_CDN_URL;

// BUNNY_STORAGE_ZONE should be just the zone name, e.g. "praisol" not the full hostname.
// Build BASE_URL correctly:
const BASE_URL = `https://storage.bunnycdn.com/${STORAGE_ZONE}`;

const IS_LOCAL_FALLBACK = !STORAGE_ZONE || !ACCESS_KEY || 
  STORAGE_ZONE.includes('your_') || STORAGE_ZONE.includes('.com');

/**
 * Upload a file buffer to Bunny.net (with local fallback)
 */
async function uploadFile(fileBuffer, remotePath, contentType = 'application/octet-stream') {
  if (IS_LOCAL_FALLBACK) {
    console.log('⚠️ BUNNY_NET credentials missing. Using local fallback for:', remotePath);
    const localPath = path.join(__dirname, '../../public', remotePath);
    const localDir = path.dirname(localPath);
    
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    
    fs.writeFileSync(localPath, fileBuffer);
    // Relative URL for local serving
    return `${process.env.API_URL || 'http://localhost:4000'}/public/${remotePath}`;
  }

  await axios.put(`${BASE_URL}/${remotePath}`, fileBuffer, {
    headers: {
      AccessKey: ACCESS_KEY,
      'Content-Type': contentType,
    },
    maxBodyLength: Infinity,
  });
  return `${CDN_URL}/${remotePath}`;
}

/**
 * Delete a file from Bunny.net
 * @param {string} remotePath - path inside storage zone
 */
async function deleteFile(remotePath) {
  await axios.delete(`${BASE_URL}/${remotePath}`, {
    headers: { AccessKey: ACCESS_KEY },
  });
}

/**
 * Extract remote path from a CDN URL
 * e.g. "https://cdn.b-cdn.net/tenants/abc/img.jpg" → "tenants/abc/img.jpg"
 */
function getRemotePath(cdnUrl) {
  return cdnUrl.replace(`${CDN_URL}/`, '');
}

module.exports = { uploadFile, deleteFile, getRemotePath };
