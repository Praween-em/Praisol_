const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('categories', ['name', 'image_url', 'description', 'sort_order', 'is_visible'], 'sort_order ASC');
