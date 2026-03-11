const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('staff', ['name', 'designation', 'department', 'qualification', 'photo_url', 'email', 'phone', 'sort_order', 'is_visible'], 'sort_order ASC');
