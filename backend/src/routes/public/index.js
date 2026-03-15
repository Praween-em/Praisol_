const router = require('express').Router();
const { pool } = require('../../db');
const tenantMiddleware = require('../../middleware/tenant');
const { getTenantDB } = require('../../db/tenant');
const { ok, notFound, badRequest } = require('../../utils/response');
const { v4: uuidv4 } = require('uuid');

// All public routes need tenant context (no auth)
router.use(tenantMiddleware);

// ─── COMMON (school + college + business) ───

// GET /api/public/site-settings
router.get('/site-settings', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM site_settings LIMIT 1`);
    ok(res, rows[0] || {});
  } catch (e) { next(e); }
});

// GET /api/public/news
router.get('/news', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const { rows } = await db.query(
      `SELECT * FROM news WHERE is_published = TRUE ORDER BY published_at DESC LIMIT $1`, [limit]
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/news/:id
router.get('/news/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM news WHERE id=$1 AND is_published=TRUE`, [req.params.id]);
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// GET /api/public/results
router.get('/results', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM results WHERE is_published=TRUE ORDER BY published_at DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/notifications
router.get('/notifications', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT * FROM notifications WHERE is_published=TRUE ORDER BY is_important DESC, published_at DESC`
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/events
router.get('/events', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT * FROM events WHERE is_published=TRUE ORDER BY event_date ASC`
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/gallery
router.get('/gallery', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM gallery_albums ORDER BY created_at DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/gallery/:albumId/photos
router.get('/gallery/:albumId/photos', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT * FROM gallery_photos WHERE album_id=$1 ORDER BY sort_order ASC`, [req.params.albumId]
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/staff
router.get('/staff', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM staff WHERE is_visible=TRUE ORDER BY sort_order ASC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/departments
router.get('/departments', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM departments WHERE is_visible=TRUE ORDER BY sort_order ASC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/admissions
router.get('/admissions', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM admissions ORDER BY created_at DESC LIMIT 1`);
    ok(res, rows[0] || {});
  } catch (e) { next(e); }
});

// GET /api/public/pages/:slug
router.get('/pages/:slug', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `SELECT * FROM pages WHERE slug=$1 AND is_visible=TRUE`, [req.params.slug]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// ─── COLLEGE-ONLY ───

router.get('/programs', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM programs WHERE is_visible=TRUE ORDER BY sort_order ASC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

router.get('/placements', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM placements ORDER BY academic_year DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

router.get('/achievements', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM achievements WHERE is_published=TRUE ORDER BY date DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

router.get('/accreditation', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM accreditation ORDER BY body ASC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// ─── BUSINESS-ONLY ───

// GET /api/public/categories
router.get('/categories', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM categories WHERE is_visible=TRUE ORDER BY sort_order ASC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/products
router.get('/products', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { category_id } = req.query;
    const where = category_id ? `WHERE p.is_visible=TRUE AND p.category_id=$1` : `WHERE p.is_visible=TRUE`;
    const params = category_id ? [category_id] : [];
    const { rows } = await db.query(`
      SELECT p.*,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      ${where} GROUP BY p.id ORDER BY p.sort_order ASC
    `, params);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/products/:id
router.get('/products/:id', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`
      SELECT p.*,
        COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id=$1 AND p.is_visible=TRUE GROUP BY p.id
    `, [req.params.id]);
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// POST /api/public/orders — guest checkout (no login required)
router.post('/orders', async (req, res, next) => {
  try {
    const { customer_name, customer_phone, customer_email, delivery_address, notes, items, payment_method } = req.body;
    if (!customer_name || !customer_phone || !items?.length)
      return badRequest(res, 'customer_name, customer_phone, and items are required');

    const db = getTenantDB(req.schemaName);

    // Verify and compute totals from DB prices (never trust client-sent prices)
    let subtotal = 0;
    const orderItems = [];
    for (const item of items) {
      const { rows } = await db.query(`SELECT id, name, price, sale_price, is_in_stock FROM products WHERE id = $1`, [item.product_id]);
      if (!rows[0] || !rows[0].is_in_stock) return badRequest(res, `Product not available: ${item.product_id}`);
      const unitPrice = parseFloat(rows[0].sale_price || rows[0].price);
      const total = unitPrice * item.quantity;
      subtotal += total;
      orderItems.push({ product_id: rows[0].id, product_name: rows[0].name, unit_price: unitPrice, quantity: item.quantity, total });
    }

    const delivery_fee = 0;
    const total = subtotal + delivery_fee;
    const orderNumber = `ORD-${Date.now()}-${uuidv4().split('-')[0].toUpperCase()}`;

    const orderResult = await db.query(
      `INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, delivery_address, notes, subtotal, delivery_fee, total, payment_method)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [orderNumber, customer_name, customer_phone, customer_email || null, delivery_address || null, notes || null, subtotal, delivery_fee, total, payment_method || 'cod']
    );
    const order = orderResult.rows[0];

    for (const oi of orderItems) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, total) VALUES ($1,$2,$3,$4,$5,$6)`,
        [order.id, oi.product_id, oi.product_name, oi.unit_price, oi.quantity, oi.total]
      );
    }

    ok(res, { order, items: orderItems });
  } catch (e) { next(e); }
});

// GET /api/public/announcements
router.get('/announcements', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM announcements WHERE is_active=TRUE ORDER BY created_at DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/testimonials
router.get('/testimonials', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM testimonials WHERE is_visible=TRUE ORDER BY created_at DESC`);
    ok(res, rows);
  } catch (e) { next(e); }
});

// GET /api/public/site-config — fetch visual builder config + site meta (no auth)
router.get('/site-config', async (req, res, next) => {
  try {
    const { rows: siteRows } = await pool.query(
      `SELECT system_type, name as site_name, builder_config FROM public.deployments WHERE slug = $1 LIMIT 1`,
      [req.tenant.slug]
    );
    
    if (!siteRows[0]) return notFound(res, 'Site config not found');
    
    ok(res, {
      system_type: siteRows[0].system_type,
      site_name: siteRows[0].site_name,
      builder_config: typeof siteRows[0].builder_config === 'string' 
        ? JSON.parse(siteRows[0].builder_config) 
        : siteRows[0].builder_config
    });
  } catch (e) { next(e); }
});

// POST /api/public/form-submissions — visitor submits a form (no auth)
router.post('/form-submissions', async (req, res, next) => {
  try {
    const { form_id, form_title, data } = req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data))
      return badRequest(res, 'Submission data must be a non-empty object');

    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(
      `INSERT INTO form_submissions (form_id, form_title, data)
       VALUES ($1, $2, $3) RETURNING *`,
      [form_id || null, form_title || 'Form', JSON.stringify(data)]
    );
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

module.exports = router;
