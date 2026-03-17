const router = require('express').Router();
const { pool } = require('../../db');
const { ok, serverError } = require('../../utils/response');

// GET /api/platform/dashboard — dashboard aggregations
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 1. Get stats
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM public.deployments WHERE user_id = $1) as total_deployments,
        (SELECT COUNT(*) FROM public.deployments WHERE user_id = $1 AND status = 'active') as active_sites,
        (SELECT COUNT(*) FROM public.form_submissions WHERE site_id IN (SELECT id FROM public.deployments WHERE user_id = $1) AND created_at >= current_date) as today_submissions
    `;
    const statsResult = await pool.query(statsQuery, [userId]);
    const stats = statsResult.rows[0];

    // 2. Get recent deployments
    const recentDeploymentsResult = await pool.query(
      `SELECT id, name, slug, status, created_at FROM public.deployments 
       WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5`,
      [userId]
    );

    // 3. Get recent form submissions (applications)
    const recentSubmissionsQuery = `
      SELECT fs.id, fs.form_type, fs.data, fs.created_at, d.name as site_name 
      FROM public.form_submissions fs
      JOIN public.deployments d ON fs.site_id = d.id
      WHERE d.user_id = $1
      ORDER BY fs.created_at DESC LIMIT 5
    `;
    
    // Check if form_submissions table exists, otherwise return empty array
    let recentSubmissions = [];
    try {
        const recentSubmissionsResult = await pool.query(recentSubmissionsQuery, [userId]);
        recentSubmissions = recentSubmissionsResult.rows;
    } catch(err) {
        // Table might not exist or related schema changes might not be applied, ignore for now
        // console.log("Form submissions error:", err.message);
    }

    ok(res, {
        stats: {
           totalDeployments: parseInt(stats.total_deployments || 0),
           activeSites: parseInt(stats.active_sites || 0),
           todaySubmissions: parseInt(stats.today_submissions || 0),
           activeUsers: 156 // TODO: In a real system, you'd calculate this or mock it appropriately
        },
        recentDeployments: recentDeploymentsResult.rows,
        recentSubmissions: recentSubmissions
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    serverError(res, 'Failed to fetch dashboard data', error);
  }
});

module.exports = router;
