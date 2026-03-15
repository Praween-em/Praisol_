const router = require('express').Router();
const { getTenantDB } = require('../../db/tenant');
const { ok, notFound, badRequest } = require('../../utils/response');

// GET /api/admin/form-submissions — list all (newest first)
// Query: ?unread_only=true
router.get('/', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const unreadOnly = req.query.unread_only === 'true';
    const where = unreadOnly ? 'WHERE is_read = FALSE' : '';
    const { rows } = await db.query(
      `SELECT * FROM form_submissions ${where} ORDER BY submitted_at DESC`
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/admin/form-submissions/unread-count
router.get('/unread-count', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT COUNT(*) AS count FROM form_submissions WHERE is_read = FALSE`
    );
    ok(res, { count: parseInt(rows[0].count, 10) });
  } catch (e) { next(e); }
});

// PATCH /api/admin/form-submissions/:id/read — mark one as read
router.patch('/:id/read', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `UPDATE form_submissions SET is_read = TRUE WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (!rows[0]) return notFound(res, 'Submission not found');
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// PATCH /api/admin/form-submissions/mark-all-read — mark all as read
router.patch('/mark-all-read', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    await db.query(`UPDATE form_submissions SET is_read = TRUE WHERE is_read = FALSE`);
    ok(res, { message: 'All submissions marked as read' });
  } catch (e) { next(e); }
});

// DELETE /api/admin/form-submissions/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `DELETE FROM form_submissions WHERE id = $1 RETURNING id`,
      [req.params.id]
    );
    if (!rows[0]) return notFound(res, 'Submission not found');
    ok(res, { deleted: true });
  } catch (e) { next(e); }
});

module.exports = router;
