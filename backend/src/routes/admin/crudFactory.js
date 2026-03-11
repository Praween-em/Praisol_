/**
 * Generic CRUD route factory for simple tenant tables.
 * Creates GET list, GET by ID, POST, PUT, DELETE routes.
 *
 * @param {string} tableName - SQL table name
 * @param {string[]} fields - fields to allow in INSERT/UPDATE
 * @param {string} [orderBy='created_at DESC'] - ORDER BY clause
 */
const { getTenantDB } = require('../../../db/tenant');
const { ok, created, notFound, badRequest } = require('../../../utils/response');

function makeCRUD(tableName, fields, orderBy = 'created_at DESC') {
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
        // fallback for tables without updated_at
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
