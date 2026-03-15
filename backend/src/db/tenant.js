const { pool } = require('./index');

/**
 * Create an isolated tenant schema and run the system-type SQL template.
 * @param {string} schemaName - e.g. 'tenant_sch_abc123'
 * @param {string} systemType - 'school' | 'college' | 'business'
 */
async function createTenantSchema(schemaName, systemType) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const sqlTemplate = require(`./templates/${systemType}`);
    const sql = sqlTemplate(schemaName);
    await client.query(sql);

    await client.query('COMMIT');
    console.log(`✅ Tenant schema created: ${schemaName} (${systemType})`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(`❌ Schema creation failed for ${schemaName}:`, e.message);
    throw e;
  } finally {
    client.release();
  }
}

/**
 * Drop a tenant schema and all its tables.
 * Used when a deployment is permanently deleted.
 */
async function dropTenantSchema(schemaName) {
  const client = await pool.connect();
  try {
    await client.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
    console.log(`🗑️  Tenant schema dropped: ${schemaName}`);
  } finally {
    client.release();
  }
}

/**
 * Returns a query helper that automatically sets search_path to the tenant schema.
 * All queries through this helper target the tenant's tables.
 * @param {string} schemaName
 */
function getTenantDB(schemaName) {
  return {
    query: async (sql, params = []) => {
      const client = await pool.connect();
      try {
        await client.query(`SET search_path TO "${schemaName}", public`);
        const result = await client.query(sql, params);
        // Reset search_path before releasing back to pool
        await client.query(`SET search_path TO public`);
        return result;
      } finally {
        client.release();
      }
    },
    /**
     * Run a transaction in the tenant schema context.
     * @param {function} fn - async function receiving a client
     */
    transaction: async (fn) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        // Use SET LOCAL for transactions so it auto-resets on COMMIT/ROLLBACK
        await client.query(`SET LOCAL search_path TO "${schemaName}", public`);
        const result = await fn(client);
        await client.query('COMMIT');
        return result;
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    },
  };
}

module.exports = { createTenantSchema, dropTenantSchema, getTenantDB };
