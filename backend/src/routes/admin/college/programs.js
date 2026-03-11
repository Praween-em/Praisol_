const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('programs', ['department_id', 'name', 'degree_type', 'duration', 'eligibility', 'description', 'brochure_url', 'is_visible', 'sort_order'], 'sort_order ASC');
