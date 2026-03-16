require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { errorHandler } = require('./middleware/errorHandler');
const { rateLimiter } = require('./middleware/rateLimit');

const platformRoutes = require('./routes/platform');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();
const path = require('path');

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Serve static files (for local upload fallback)
app.use('/public', express.static(path.join(__dirname, '../public')));

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// CORS
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // In development, allow ANY origin (for testing on local network/IPs)
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    const allowed = (process.env.ALLOWED_ORIGINS || '').split(',');
    if (allowed.some(a => a.trim() === origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Rejected origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Routes
app.use('/api/platform', platformRoutes);
app.use('/api/admin', adminRoutes);     // tenantMiddleware + authMiddleware inside
app.use('/api/public', publicRoutes);   // tenantMiddleware inside, no auth

// Public: resolve a custom domain to a deployment slug (used by Next.js middleware)
// GET /resolve-domain?host=www.mysite.com
app.get('/resolve-domain', async (req, res) => {
  try {
    const { pool } = require('./db');
    const host = (req.query.host || '').toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
    if (!host) return res.status(400).json({ success: false, message: 'host query param required' });

    const { rows } = await pool.query(
      `SELECT slug FROM public.deployments
       WHERE LOWER(custom_domain) = $1 AND status NOT IN ('deleted') LIMIT 1`,
      [host]
    );
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Domain not mapped' });
    res.json({ success: true, slug: rows[0].slug });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

// Caddy On-Demand TLS validation endpoint
// Caddy will "ask" this endpoint if it should issue an SSL cert for a domain
app.get('/validate-domain', async (req, res) => {
  try {
    const { pool } = require('./db');
    const domain = (req.query.domain || '').toLowerCase();
    
    if (!domain) return res.status(400).send();

    // 1. Allow main platform domains
    const platformDomains = ['praisol.online', 'www.praisol.online', 'api.praisol.online'];
    if (platformDomains.includes(domain)) return res.status(200).send();

    // 2. Check if it's a valid subdomain (slug.praisol.online)
    if (domain.endsWith('.praisol.online')) {
      const slug = domain.replace('.praisol.online', '');
      const { rows } = await pool.query(
        "SELECT 1 FROM public.deployments WHERE slug = $1 AND status != 'deleted' LIMIT 1",
        [slug]
      );
      if (rows.length > 0) return res.status(200).send();
    }

    // 3. Check if it's a valid custom domain
    const { rows: customRows } = await pool.query(
      "SELECT 1 FROM public.deployments WHERE LOWER(custom_domain) = $1 AND status != 'deleted' LIMIT 1",
      [domain]
    );
    if (customRows.length > 0) return res.status(200).send();

    // Otherwise, reject
    return res.status(404).send();
  } catch (err) {
    console.error('[Caddy-Validate] Error:', err);
    return res.status(500).send();
  }
});

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Global error handler
app.use(errorHandler);

module.exports = app;
