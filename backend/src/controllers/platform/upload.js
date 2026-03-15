const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { uploadFile } = require('../../services/bunny');

/**
 * Handle image upload for the platform (e.g., visual builder)
 */
async function uploadImage(req, res, next) {
  try {
    const file = req.file;
    console.log('[DEBUG] Upload image hit. File:', file ? `${file.originalname} (${file.size} bytes)` : 'MISSING');
    if (!file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file provided' 
      });
    }

    // Generate a unique path
    const ext = path.extname(file.originalname).toLowerCase();
    const fileName = `${uuidv4()}${ext}`;
    
    // Default to 'platform/uploads' if no specific context provided
    const remotePath = `platform/uploads/${fileName}`;

    const url = await uploadFile(file.buffer, remotePath, file.mimetype);

    res.json({
      success: true,
      data: {
        url,
        fileName
      }
    });
  } catch (error) {
    console.error('Upload Error:', error);
    next(error);
  }
}

module.exports = {
  uploadImage
};
