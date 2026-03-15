require('dotenv').config({ path: './.env' });
const { Pool } = require('pg');
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

async function check() {
  try {
    const res = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log("Public tables:", res.rows.map(r => r.tablename).join(", "));
    
    // Also check if deployments exists specifically
    const depExist = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'deployments')");
    console.log("Deployments exists in public:", depExist.rows[0].exists);

    // Check all schemas for deployments
    const allDep = await pool.query("SELECT table_schema FROM information_schema.tables WHERE table_name = 'deployments'");
    console.log("Deployments found in schemas:", allDep.rows.map(r => r.table_schema).join(", "));
    
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
check();
