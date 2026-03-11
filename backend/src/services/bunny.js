const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const ZONE = process.env.BUNNY_STORAGE_ZONE;
const KEY = process.env.BUNNY_ACCESS_KEY;
const CDN_URL = process.env.BUNNY_CDN_URL;
const BASE_URL = `https://storage.bunnycdn.com/${ZONE}`;

/**
 * Upload a file buffer to Bunny.net storage.
 * @param {Buffer} buffer - file data
 * @param {string} remotePath - path in storage zone e.g. 'tenants/abc/logo.png'
 * @param {string} contentType - MIME type
 * @returns {string} Public CDN URL
 */
async function uploadFile(buffer, remotePath, contentType = 'application/octet-stream') {
  await axios.put(`${BASE_URL}/${remotePath}`, buffer, {
    headers: {
      AccessKey: KEY,
      'Content-Type': contentType,
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });
  return `${CDN_URL}/${remotePath}`;
}

/**
 * Delete a file from Bunny.net.
 * @param {string} remotePath - path inside storage zone
 */
async function deleteFile(remotePath) {
  await axios.delete(`${BASE_URL}/${remotePath}`, {
    headers: { AccessKey: KEY },
  });
}

/**
 * Generate a remote file path for a tenant upload.
 * @param {string} deploymentId
 * @param {string} folder - e.g. 'news', 'products', 'logos'
 * @param {string} originalName - original filename (extension extracted)
 * @returns {string} e.g. 'tenants/uuid/news/uuid.jpg'
 */
function buildRemotePath(deploymentId, folder, originalName) {
  const ext = path.extname(originalName).toLowerCase();
  return `tenants/${deploymentId}/${folder}/${uuidv4()}${ext}`;
}

/**
 * Extract the storage path from a CDN URL.
 */
function getRemotePath(cdnUrl) {
  return cdnUrl.replace(`${CDN_URL}/`, '');
}

module.exports = { uploadFile, deleteFile, buildRemotePath, getRemotePath };
