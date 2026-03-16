const router = require('express').Router();
const { pool } = require('../../db');
const { ok, badRequest } = require('../../utils/response');

// GET /api/platform/builds — list app builds for user
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ab.* FROM app_builds ab
       JOIN deployments d ON ab.deployment_id = d.id
       WHERE d.user_id = $1 ORDER BY ab.created_at DESC`,
      [req.user.id]
    );
    ok(res, rows);
  } catch (e) { next(e); }
});

// POST /api/platform/builds — trigger APK/AAB build
router.post('/', async (req, res, next) => {
  try {
    const { deployment_id, build_type, app_name, app_version } = req.body;
    if (!deployment_id || !['apk', 'aab'].includes(build_type))
      return badRequest(res, 'deployment_id and build_type (apk|aab) are required');

    // 1. Verify deployment ownership
    const { rows: depRows } = await pool.query(
      `SELECT * FROM deployments WHERE id = $1 AND user_id = $2`,
      [deployment_id, req.user.id]
    );
    if (!depRows[0]) return badRequest(res, 'Invalid deployment');
    const deployment = depRows[0];

    // 2. Queue the build
    const { rows } = await pool.query(
      `INSERT INTO app_builds (deployment_id, build_type, app_name, app_version, status)
       VALUES ($1, $2, $3, $4, 'queued') RETURNING *`,
      [deployment_id, build_type, app_name || 'My App', app_version || '1.0.0']
    );

    // 3. Trigger simulated EAS Build in background
    const { triggerBuild } = require('../../services/buildService');
    triggerBuild(rows[0], deployment);

    ok(res, { message: 'Build queued', build: rows[0] });
  } catch (e) { next(e); }
});

// GET /api/platform/builds/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ab.* FROM app_builds ab
       JOIN deployments d ON ab.deployment_id = d.id
       WHERE ab.id = $1 AND d.user_id = $2`,
      [req.params.id, req.user.id]
    );
    if (!rows[0]) return require('../../utils/response').notFound(res);
    ok(res, rows[0]);
  } catch (e) { next(e); }
});

module.exports = router;
