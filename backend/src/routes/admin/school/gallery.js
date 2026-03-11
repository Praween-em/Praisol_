const router = require('express').Router();
const { getTenantDB } = require('../../../db/tenant');
const { uploadFile, buildRemotePath, deleteFile, getRemotePath } = require('../../../services/bunny');
const upload = require('../../../middleware/upload');
const { ok, created, notFound, badRequest } = require('../../../utils/response');

// ─── Albums ───

// GET /api/admin/gallery
router.get('/', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM gallery_albums ORDER BY created_at DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// POST /api/admin/gallery
router.post('/', async (req, res, next) => {
  try {
    const { title, description, cover_url } = req.body;
    if (!title) return badRequest(res, 'Album title is required');
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `INSERT INTO gallery_albums (title, description, cover_url) VALUES ($1,$2,$3) RETURNING *`,
      [title, description || null, cover_url || null]
    );
    created(res, rows[0]);
  } catch (e) { next(e); }
});

// PUT /api/admin/gallery/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, cover_url } = req.body;
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `UPDATE gallery_albums SET title=COALESCE($1,title), description=COALESCE($2,description), cover_url=COALESCE($3,cover_url)
       WHERE id=$4 RETURNING *`,
      [title, description, cover_url, req.params.id]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// DELETE /api/admin/gallery/:id — also deletes all photos in album
router.delete('/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`DELETE FROM gallery_albums WHERE id=$1 RETURNING id`, [req.params.id]);
    if (!rows[0]) return notFound(res);
    ok(res, { message: 'Album and all photos deleted' });
  } catch (e) { next(e); }
});

// ─── Photos ───

// GET /api/admin/gallery/:albumId/photos
router.get('/:albumId/photos', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT * FROM gallery_photos WHERE album_id=$1 ORDER BY sort_order ASC`, [req.params.albumId]
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// POST /api/admin/gallery/:albumId/photos — upload photo to album
router.post('/:albumId/photos', upload.single('photo'), async (req, res, next) => {
  try {
    if (!req.file) return badRequest(res, 'Photo file required');
    const remotePath = buildRemotePath(req.tenant.id, `gallery/${req.params.albumId}`, req.file.originalname);
    const url = await uploadFile(req.file.buffer, remotePath, req.file.mimetype);
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `INSERT INTO gallery_photos (album_id, image_url, caption, sort_order)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [req.params.albumId, url, req.body.caption || null, parseInt(req.body.sort_order) || 0]
    );
    created(res, rows[0]);
  } catch (e) { next(e); }
});

// DELETE /api/admin/gallery/photos/:photoId
router.delete('/photos/:photoId', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`DELETE FROM gallery_photos WHERE id=$1 RETURNING image_url`, [req.params.photoId]);
    if (!rows[0]) return notFound(res);
    await deleteFile(getRemotePath(rows[0].image_url)).catch(() => {});
    ok(res, { message: 'Photo deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
