const express = require('express');
const router = express.Router();
const careerController = require('../../controllers/career');

// Public route for job applications
router.post('/apply', careerController.submitApplication);

module.exports = router;
