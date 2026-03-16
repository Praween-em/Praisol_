require('dotenv').config();
const { pool } = require('./src/db');
pool.query("SELECT id, system_type, name, slug, schema_name, status, custom_domain FROM public.deployments LIMIT 20")
  .then(res => { 
    console.log(JSON.stringify(res.rows, null, 2)); 
    process.exit(0); 
  })
  .catch(e => { 
    console.error(e); 
    process.exit(1); 
  });
