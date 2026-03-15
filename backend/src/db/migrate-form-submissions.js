/**
 * Migration script: adds form_submissions table to ALL existing tenant schemas.
 * Run once: node src/db/migrate-form-submissions.js
 *
 * Safe to run multiple times — uses CREATE TABLE IF NOT EXISTS.
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./index');

const ADD_TABLE_SQL = (schema) => `
  SET search_path TO "${schema}";
  CREATE TABLE IF NOT EXISTS form_submissions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id      VARCHAR(100),
    form_title   VARCHAR(200) DEFAULT 'Form',
    data         JSONB NOT NULL DEFAULT '{}',
    is_read      BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔍 Fetching all tenant schemas from deployments table...');
    const { rows: deployments } = await client.query(
      `SELECT id, slug, schema_name, system_type FROM deployments WHERE status != 'deleted'`
    );

    if (deployments.length === 0) {
      console.log('ℹ️  No active deployments found. Nothing to migrate.');
      return;
    }

    console.log(`📋 Found ${deployments.length} tenant(s) to migrate.\n`);

    for (const deployment of deployments) {
      try {
        await client.query(ADD_TABLE_SQL(deployment.schema_name));
        console.log(`  ✅ ${deployment.slug} (${deployment.schema_name})`);
      } catch (err) {
        console.error(`  ❌ ${deployment.slug}: ${err.message}`);
      }
    }

    console.log('\n✅ Migration complete!');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((e) => {
  console.error('❌ Migration failed:', e.message);
  process.exit(1);
});
