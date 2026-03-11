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

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowed = (process.env.ALLOWED_ORIGINS || '').split(',');
    if (!origin || allowed.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
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

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Global error handler
app.use(errorHandler);

module.exports = app;
