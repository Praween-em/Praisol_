/**
 * Handle Job Application Submissions
 * POST /api/platform/career/apply
 */
exports.submitApplication = async (req, res) => {
  try {
    const { name, email, phone, position, experience, resumeLink, message } = req.body;

    // Basic validation
    if (!name || !email || !position) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // In a full implementation, we would save this to a 'career_applications' table.
    // For now, we will log it to the console and return success.
    
    console.log('--- NEW JOB APPLICATION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Position: ${position}`);
    console.log(`Experience: ${experience} years`);
    console.log(`Resume: ${resumeLink}`);
    console.log(`Message: ${message}`);
    console.log('---------------------------');

    // Future: Send email notification to info.praisol@gmail.com here

    res.json({
      success: true,
      message: 'Application received. We will get back to you soon!'
    });
  } catch (error) {
    console.error('[Career] Submit Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
