const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('admissions', ['academic_year', 'description', 'eligibility', 'process', 'important_dates', 'brochure_url', 'is_open']);
