const router = require('express').Router();
const { getTenantDB } = require('../../../db/tenant');
const { ok, badRequest } = require('../../../utils/response');

// GET /api/admin/site-settings
router.get('/', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows } = await db.query(`SELECT * FROM site_settings LIMIT 1`);
    ok(res, rows[0] || {});
  } catch (e) { next(e); }
});

// PUT /api/admin/site-settings
router.put('/', async (req, res, next) => {
  try {
    const db = getTenantDB(req.schemaName);
    const { rows: [existing] } = await db.query(`SELECT id FROM site_settings LIMIT 1`);

    const allowedFields = [
      'site_name', 'business_name', 'tagline', 'logo_url', 'favicon_url',
      'contact_email', 'contact_phone', 'contact_whatsapp', 'address',
      'facebook_url', 'twitter_url', 'youtube_url', 'instagram_url',
      'upi_id', 'primary_color', 'secondary_color',
    ];

    const data = {};
    allowedFields.forEach(f => { if (req.body[f] !== undefined) data[f] = req.body[f]; });
    if (Object.keys(data).length === 0) return badRequest(res, 'No valid fields provided');

    let result;
    if (existing) {
      const cols = Object.keys(data);
      const vals = Object.values(data);
      const sets = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');
      result = await db.query(
        `UPDATE site_settings SET ${sets}, updated_at = NOW() WHERE id = $${cols.length + 1} RETURNING *`,
        [...vals, existing.id]
      );
    } else {
      const cols = Object.keys(data);
      const vals = Object.values(data);
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
      result = await db.query(
        `INSERT INTO site_settings (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`,
        vals
      );
    }
    ok(res, result.rows[0]);
  } catch (e) { next(e); }
});

module.exports = router;
