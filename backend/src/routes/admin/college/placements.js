const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('placements', ['academic_year', 'company_name', 'company_logo_url', 'package_lpa', 'students_placed', 'description'], 'academic_year DESC');
