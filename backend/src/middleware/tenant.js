const { pool } = require('../db');
const { notFound, forbidden, badRequest } = require('../utils/response');

/**
 * Resolves tenant from request headers and attaches to req.
 * Resolution order:
 *   1. X-Tenant-Domain header  → look up by custom_domain column
 *   2. X-Tenant-ID header      → look up by slug (existing behaviour)
 * All /admin and /public routes must pass through this.
 */
async function tenantMiddleware(req, res, next) {
  const customDomain = req.headers['x-tenant-domain'];
  const slug = req.headers['x-tenant-id'];

  if (!customDomain && !slug) {
    return badRequest(res, 'X-Tenant-ID or X-Tenant-Domain header is required');
  }

  try {
    let rows;

    if (customDomain) {
      // Strip protocol / path just in case the header value is a full URL
      const domain = customDomain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
      console.log(`[TenantMiddleware] Looking up custom_domain: "${domain}"`);
      ({ rows } = await pool.query(
        `SELECT id, system_type, name, slug, schema_name, status, custom_domain
         FROM public.deployments
         WHERE LOWER(custom_domain) = $1 AND status NOT IN ('deleted') LIMIT 1`,
        [domain]
      ));
    } else {
      console.log(`[TenantMiddleware] Looking up slug: "${slug}"`);
      ({ rows } = await pool.query(
        `SELECT id, system_type, name, slug, schema_name, status, custom_domain
         FROM public.deployments WHERE slug = $1 LIMIT 1`,
        [slug]
      ));
    }

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
