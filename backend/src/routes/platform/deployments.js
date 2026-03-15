const router = require('express').Router();
const { pool } = require('../../db');
const { createTenantSchema, dropTenantSchema } = require('../../db/tenant');
const { ok, created, badRequest, notFound } = require('../../utils/response');
const { v4: uuidv4 } = require('uuid');

// GET /api/platform/deployments — list user's deployments
router.get('/', async (req, res, next) => {
  try {
    const { rows: deployments } = await pool.query(
      `SELECT id, system_type, name, slug, schema_name, status, custom_domain, created_at, updated_at
       FROM public.deployments WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );

    // Fetch unread submission counts for each active deployment
    const enrichedDeployments = await Promise.all(deployments.map(async (d) => {
      if (d.status !== 'active') return { ...d, unread_submissions: 0 };
      try {
        const { rows } = await pool.query(
          `SELECT COUNT(*) as count FROM "${d.schema_name}".form_submissions WHERE is_read = FALSE`
        );
        return { ...d, unread_submissions: parseInt(rows[0].count, 10) };
      } catch (err) {
        // Table might not exist yet if migration hasn't run for some reason
        return { ...d, unread_submissions: 0 };
      }
    }));

    ok(res, enrichedDeployments);
  } catch (e) { next(e); }
});

// POST /api/platform/deployments — create a new deployment
router.post('/', async (req, res, next) => {
  try {
    const { system_type, name } = req.body;
    if (!system_type || !['school', 'college', 'business'].includes(system_type))
      return badRequest(res, 'system_type must be: school, college, or business');
    if (!name?.trim())
      return badRequest(res, 'Site name is required');

    // Generate slug from name
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const uniqueSuffix = uuidv4().split('-')[0];
    const slug = `${baseSlug}-${uniqueSuffix}`;

    // Schema name prefix by type
    const prefix = { school: 'sch', college: 'col', business: 'biz' }[system_type];
    const schemaName = `tenant_${prefix}_${uuidv4().replace(/-/g, '').slice(0, 16)}`;

    // Insert deployment record
    const { rows } = await pool.query(
      `INSERT INTO public.deployments (user_id, system_type, name, slug, schema_name, status)
       VALUES ($1, $2, $3, $4, $5, 'building') RETURNING *`,
      [req.user.id, system_type, name.trim(), slug, schemaName]
    );
    const deployment = rows[0];

    // Provision tenant schema in background
    createTenantSchema(schemaName, system_type)
      .then(async () => {
        await pool.query(
          `UPDATE public.deployments SET status = 'active', updated_at = NOW() WHERE id = $1`,
          [deployment.id]
        );
      })
      .catch((err) => {
        console.error('Schema provision failed:', err.message);
        pool.query(`UPDATE deployments SET status = 'building' WHERE id = $1`, [deployment.id]);
      });

    created(res, deployment);
  } catch (e) { next(e); }
});

// GET /api/platform/deployments/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM public.deployments WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// PUT /api/platform/deployments/:id/builder-config — save builder state
router.put('/:id/builder-config', async (req, res, next) => {
  try {
    const { builder_config } = req.body;
    if (!builder_config) return badRequest(res, 'builder_config is required');

    const { rows } = await pool.query(
      `UPDATE public.deployments SET builder_config = $1, updated_at = NOW()
       WHERE id = $2 AND user_id = $3 RETURNING id, slug, builder_config, updated_at`,
      [JSON.stringify(builder_config), req.params.id, req.user.id]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// PATCH /api/platform/deployments/:id/settings — update name and/or custom domain
router.patch('/:id/settings', async (req, res, next) => {
  try {
    const { name, custom_domain } = req.body;
    if (!name?.trim()) return badRequest(res, 'Site name is required');

    // Basic domain validation (optional but must be string if present)
    const domain = custom_domain?.trim() || null;
    if (domain && !/^[a-zA-Z0-9][a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}$/.test(domain)) {
      return badRequest(res, 'Invalid domain format. Example: www.mysite.com');
    }

    const { rows } = await pool.query(
      `UPDATE public.deployments
       SET name = $1, custom_domain = $2, updated_at = NOW()
       WHERE id = $3 AND user_id = $4
       RETURNING id, name, slug, custom_domain, status, system_type, updated_at`,
      [name.trim(), domain, req.params.id, req.user.id]
    );
    if (!rows[0]) return notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

// DELETE /api/platform/deployments/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `UPDATE public.deployments SET status = 'deleted', updated_at = NOW()
       WHERE id = $1 AND user_id = $2 RETURNING schema_name`,
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return notFound(res);
    await dropTenantSchema(rows[0].schema_name);
    ok(res, { message: 'Deployment deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
