const router = require('express').Router();
const { getTenantDB } = require('../../../db/tenant');
const { uploadFile, buildRemotePath, deleteFile, getRemotePath } = require('../../../services/bunny');
const upload = require('../.././../middleware/upload');
const { ok, created, notFound, badRequest } = require('../../../utils/response');

// GET /api/admin/products
router.get('/', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`
      SELECT p.*, 
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id ORDER BY p.sort_order ASC
    `);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/admin/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`
      SELECT p.*, 
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id = $1 GROUP BY p.id
    `, [req.params.id]);
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// POST /api/admin/products
router.post('/', async (req, res, next) => {
  try {
    const { category_id, name, description, price, sale_price, is_in_stock, is_visible } = req.body;
    if (!name || !price) return badRequest(res, 'name and price are required');
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `INSERT INTO products (category_id, name, description, price, sale_price, is_in_stock, is_visible)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [category_id || null, name, description || null, price, sale_price || null, is_in_stock !== false, is_visible !== false]
    );
    created(res, rows[0]);
  } catch (e) { next(e); }
});

// PUT /api/admin/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { category_id, name, description, price, sale_price, is_in_stock, is_visible, sort_order } = req.body;
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `UPDATE products SET category_id=$1, name=$2, description=$3, price=$4, sale_price=$5,
       is_in_stock=$6, is_visible=$7, sort_order=$8, updated_at=NOW()
       WHERE id=$9 RETURNING *`,
      [category_id || null, name, description || null, price, sale_price || null, is_in_stock, is_visible, sort_order || 0, req.params.id]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// DELETE /api/admin/products/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`DELETE FROM products WHERE id=$1 RETURNING id`, [req.params.id]);
    if (!rows[0]) return notFound(res);
    ok(res, { message: 'Product deleted' });
  } catch (e) { next(e); }
});

// POST /api/admin/products/:id/images — upload product image
router.post('/:id/images', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return badRequest(res, 'Image file required');
    const remotePath = buildRemotePath(req.tenant.id, 'products', req.file.originalname);
    const url = await uploadFile(req.file.buffer, remotePath, req.file.mimetype);
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `INSERT INTO product_images (product_id, image_url, is_primary, sort_order)
       VALUES ($1, $2, $3, 0) RETURNING *`,
      [req.params.id, url, req.body.is_primary === 'true']
    );
    created(res, rows[0]);
  } catch (e) { next(e); }
});

// DELETE /api/admin/products/:id/images/:imageId
router.delete('/:id/images/:imageId', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`DELETE FROM product_images WHERE id=$1 RETURNING image_url`, [req.params.imageId]);
    if (!rows[0]) return notFound(res);
    await deleteFile(getRemotePath(rows[0].image_url)).catch(() => {});
    ok(res, { message: 'Image deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
