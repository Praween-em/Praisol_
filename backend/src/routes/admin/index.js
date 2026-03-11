const router = require('express').Router();
const tenantMiddleware = require('../../middleware/tenant');
const authMiddleware = require('../../middleware/auth');

// All admin routes need tenant context + JWT auth
router.use(tenantMiddleware);
router.use(authMiddleware);

// Admin auth (login for site admins)
router.use('/auth', require('./auth'));

// Common to all system types
router.use('/site-settings', require('./common/siteSettings'));
router.use('/upload', require('./common/upload'));

// School-specific
router.use('/news', require('./school/news'));
router.use('/results', require('./school/results'));
router.use('/notifications', require('./school/notifications'));
router.use('/events', require('./school/events'));
router.use('/gallery', require('./school/gallery'));
router.use('/staff', require('./school/staff'));
router.use('/departments', require('./school/departments'));
router.use('/admissions', require('./school/admissions'));
router.use('/pages', require('./school/pages'));

// College-only extras (safe to mount for all — will fail gracefully if tables don't exist)
router.use('/programs', require('./college/programs'));
router.use('/placements', require('./college/placements'));
router.use('/research', require('./college/research'));
router.use('/achievements', require('./college/achievements'));
router.use('/accreditation', require('./college/accreditation'));

// Business-specific
router.use('/categories', require('./business/categories'));
router.use('/products', require('./business/products'));
router.use('/orders', require('./business/orders'));
router.use('/announcements', require('./business/announcements'));
router.use('/testimonials', require('./business/testimonials'));

module.exports = router;
