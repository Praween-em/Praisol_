const router = require('express').Router();
const upload = require('../../../middleware/upload');
const { uploadFile, buildRemotePath } = require('../../../services/bunny');
const { ok, badRequest } = require('../../../utils/response');

// POST /api/admin/upload — single file upload to Bunny.net
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return badRequest(res, 'File is required');
    const folder = req.query.folder || 'uploads';
    const remotePath = buildRemotePath(req.tenant.id, folder, req.file.originalname);
    const url = await uploadFile(req.file.buffer, remotePath, req.file.mimetype);
    ok(res, { url, remotePath });
  } catch (e) { next(e); }
});

module.exports = router;
