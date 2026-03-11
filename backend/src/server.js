const app = require('./app');
const { pool } = require('./db');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Verify DB connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`   ENV: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
