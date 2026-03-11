const router = require('express').Router();
const { getTenantDB } = require('../../../db/tenant');
const { ok, notFound } = require('../../../utils/response');

// GET /api/admin/orders
router.get('/', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { status } = req.query;
    const where = status ? `WHERE order_status = $1` : '';
    const params = status ? [status] : [];
    const { rows } = await db.query(`SELECT * FROM orders ${where} ORDER BY created_at DESC`, params);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/admin/orders/:id (with items)
router.get('/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows: [order] } = await db.query(`SELECT * FROM orders WHERE id = $1`, [req.params.id]);
    if (!order) return notFound(res);
    const { rows: items } = await db.query(`SELECT * FROM order_items WHERE order_id = $1`, [req.params.id]);
    ok(res, { ...order, items });
  } catch (e) { next(e); }
});

// PUT /api/admin/orders/:id/status — update order or payment status
router.put('/:id/status', async (req, res, next) => {
  try {
    const { order_status, payment_status } = req.body;
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `UPDATE orders SET order_status = COALESCE($1, order_status),
       payment_status = COALESCE($2, payment_status), updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [order_status || null, payment_status || null, req.params.id]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

module.exports = router;
