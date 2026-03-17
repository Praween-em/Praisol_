/**
 * Generic CRUD route factory for simple tenant tables.
 * Creates GET list, GET by ID, POST, PUT, DELETE routes.
 *
 * SECURITY: tableName and orderBy are validated against an allowlist
 * to prevent SQL injection even from internal callers. :id params are
 * validated as UUIDs to block path traversal probes.
 *
 * @param {string} tableName - SQL table name (must be in ALLOWED_TABLES)
 * @param {string[]} fields - fields to allow in INSERT/UPDATE
 * @param {string} [orderBy='created_at DESC'] - ORDER BY clause (must be in ALLOWED_ORDER_BY)
 */
const { getTenantDB } = require('../../db/tenant');
const { ok, created, notFound, badRequest } = require('../../utils/response');

// ─── Strict allowlists to prevent SQL injection via factory ───────────────────
const ALLOWED_TABLES = new Set([
  'news', 'results', 'notifications', 'events', 'gallery_albums', 'gallery_photos',
  'staff', 'departments', 'admissions', 'pages',
  'programs', 'placements', 'research', 'achievements', 'accreditation',
  'categories', 'products', 'product_images', 'orders', 'order_items',
  'announcements', 'testimonials', 'form_submissions',
]);

const ALLOWED_ORDER_BY = new Set([
  'created_at DESC', 'created_at ASC', 'updated_at DESC', 'published_at DESC',
  'sort_order ASC', 'sort_order DESC', 'event_date ASC', 'academic_year DESC',
  'body ASC', 'date DESC', 'submitted_at DESC', 'year DESC',
]);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function makeCRUD(tableName, fields, orderBy = 'created_at DESC') {
  // Fail fast at startup if table or orderBy is not in allowlist
  if (!ALLOWED_TABLES.has(tableName)) {
    throw new Error(`[crudFactory] Rejected unknown tableName: "${tableName}". Add it to ALLOWED_TABLES.`);
  }
  if (!ALLOWED_ORDER_BY.has(orderBy)) {
    throw new Error(`[crudFactory] Rejected unknown orderBy: "${orderBy}". Add it to ALLOWED_ORDER_BY.`);
  }

  const router = require('express').Router();

  // LIST
  router.get('/', async (req, res, next) => {
    try {
      const db = getTenantDB(req.schemaName);
      const { rows } = await db.query(`SELECT * FROM ${tableName} ORDER BY ${orderBy}`);
      ok(res, rows);
    } catch (e) { next(e); }
  });

  // GET BY ID
  router.get('/:id', async (req, res, next) => {
    try {
      if (!UUID_RE.test(req.params.id)) return badRequest(res, 'Invalid ID format');
      const db = getTenantDB(req.schemaName);
      const { rows } = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [req.params.id]);
      if (!rows[0]) return notFound(res);
      ok(res, rows[0]);
    } catch (e) { next(e); }
  });

  // CREATE
  router.post('/', async (req, res, next) => {
    try {
      const data = {};
      fields.forEach(f => { if (req.body[f] !== undefined) data[f] = req.body[f]; });
      if (Object.keys(data).length === 0) return badRequest(res, 'No valid fields provided');

      const cols = Object.keys(data);
      const vals = Object.values(data);
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

      const db = getTenantDB(req.schemaName);
      const { rows } = await db.query(
        `INSERT INTO ${tableName} (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`,
        vals
      );
      created(res, rows[0]);
    } catch (e) { next(e); }
  });

  // UPDATE
  router.put('/:id', async (req, res, next) => {
    try {
      if (!UUID_RE.test(req.params.id)) return badRequest(res, 'Invalid ID format');
      const data = {};
      fields.forEach(f => { if (req.body[f] !== undefined) data[f] = req.body[f]; });
      if (Object.keys(data).length === 0) return badRequest(res, 'No valid fields provided');

      const cols = Object.keys(data);
      const vals = Object.values(data);
      const setClauses = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');

      const db = getTenantDB(req.schemaName);
      const { rows } = await db.query(
        `UPDATE ${tableName} SET ${setClauses}, updated_at = NOW() WHERE id = $${cols.length + 1} RETURNING *`,
        [...vals, req.params.id]
      ).catch(() =>
        db.query(
          `UPDATE ${tableName} SET ${setClauses} WHERE id = $${cols.length + 1} RETURNING *`,
          [...vals, req.params.id]
        )
      );
      if (!rows || !rows[0]) return notFound(res);
      ok(res, rows[0]);
    } catch (e) { next(e); }
  });

  // DELETE
  router.delete('/:id', async (req, res, next) => {
    try {
      if (!UUID_RE.test(req.params.id)) return badRequest(res, 'Invalid ID format');
      const db = getTenantDB(req.schemaName);
      const { rows } = await db.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`, [req.params.id]
      );
      if (!rows[0]) return notFound(res);
      ok(res, { message: 'Deleted successfully' });
    } catch (e) { next(e); }
  });

  return router;
}

module.exports = makeCRUD;
