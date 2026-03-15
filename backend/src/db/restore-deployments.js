/**
 * Restore existing tenant schemas back into the deployments table.
 * Run ONCE after a fresh platform migration wipes the deployments table.
 *
 * Usage: node src/db/restore-deployments.js
 *
 * It will:
 *  1. Find your platform_users record (must be logged in once first)
 *  2. Find all existing tenant schemas in PostgreSQL
 *  3. Re-insert them into deployments with status='active'
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./index');

async function restore() {
  const client = await pool.connect();
  try {
    // Ensure we are looking at the platform schema
    await client.query('SET search_path TO public');

    // 1. Find the first platform user (you)
    const userResult = await client.query(
      `SELECT id, phone FROM platform_users ORDER BY created_at ASC LIMIT 1`
    );
    if (!userResult.rows.length) {
      console.error('❌ No platform_users found. Please log in via the app first, then re-run this script.');
      process.exit(1);
    }
    const user = userResult.rows[0];
    console.log(`✅ Found platform user: ${user.phone} (${user.id})\n`);

    // 2. Find all tenant schemas in PostgreSQL (tenant_sch_*, tenant_biz_*, tenant_col_*, tenant_port_*)
    const schemaResult = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name ~ '^tenant_(sch|biz|col|port)_'
      ORDER BY schema_name
    `);

    if (!schemaResult.rows.length) {
      console.log('ℹ️  No tenant schemas found in the database. Nothing to restore.');
      return;
    }
    console.log(`📋 Found ${schemaResult.rows.length} tenant schema(s):\n`);

    for (const { schema_name } of schemaResult.rows) {
      // Skip if already in deployments table
      const existing = await client.query(
        `SELECT id FROM deployments WHERE schema_name = $1`, [schema_name]
      );
      if (existing.rows.length) {
        console.log(`  ⏭️  ${schema_name} — already in deployments, skipping`);
        continue;
      }

      // Detect system type from schema name prefix
      const prefix = schema_name.split('_')[1]; // sch | biz | col | port
      const systemTypeMap = { sch: 'school', biz: 'business', col: 'college', port: 'portfolio' };
      const system_type = systemTypeMap[prefix] || 'business';

      // Try to read site name from the tenant's site_settings
      let siteName = schema_name;
      try {
        const nameCol = system_type === 'business' ? 'business_name' : 'site_name';
        const settingsResult = await client.query(
          `SELECT ${nameCol} AS name FROM "${schema_name}".site_settings LIMIT 1`
        );
        if (settingsResult.rows[0]?.name) siteName = settingsResult.rows[0].name;
      } catch (_) {} // table might not have site_settings, that's fine

      // Build slug from site name
      const baseSlug = siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      // Use last 8 chars of schema name as unique suffix
      const suffix = schema_name.slice(-8);
      const slug = `${baseSlug}-${suffix}`;

      await client.query(
        `INSERT INTO deployments (user_id, system_type, name, slug, schema_name, status)
         VALUES ($1, $2, $3, $4, $5, 'active')`,
        [user.id, system_type, siteName, slug, schema_name]
      );

      console.log(`  ✅ Restored: "${siteName}" → ${slug} (${system_type})`);
    }

    console.log('\n✅ Restore complete! Refresh your dashboard.');
  } finally {
    client.release();
    await pool.end();
  }
}

restore().catch(e => {
  console.error('❌ Restore failed:', e.message);
  process.exit(1);
});
