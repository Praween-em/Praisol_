const { pool } = require('../db');
const { notFound, forbidden, badRequest } = require('../utils/response');

/**
 * Resolves tenant from X-Tenant-ID header (slug) and attaches to req.
 * All /admin and /public routes must pass through this.
 */
async function tenantMiddleware(req, res, next) {
  const slug = req.headers['x-tenant-id'];
  if (!slug) return badRequest(res, 'X-Tenant-ID header is required');

  try {
    const { rows } = await pool.query(
      `SELECT id, system_type, name, slug, schema_name, status FROM deployments WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    const deployment = rows[0];
    if (!deployment) return notFound(res, 'Site not found');
    if (deployment.status === 'suspended')
      return forbidden(res, 'This site has been suspended');
    if (deployment.status === 'deleted')
      return notFound(res, 'Site not found');

    req.tenant = deployment;
    req.schemaName = deployment.schema_name;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = tenantMiddleware;
