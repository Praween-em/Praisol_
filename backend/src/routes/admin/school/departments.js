const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('departments', ['name', 'description', 'hod_name', 'image_url', 'sort_order', 'is_visible'], 'sort_order ASC');
