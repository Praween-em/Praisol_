require('dotenv').config();
const { pool } = require('./src/db');
pool.query("SELECT slug, status FROM public.deployments")
  .then(res => {
    const list = res.rows.map(r => r.slug + ':' + r.status).join('\n');
    require('fs').writeFileSync('deployments_list.txt', list);
    process.exit(0);
  })
  .catch(e => { console.error(e); process.exit(1); });
