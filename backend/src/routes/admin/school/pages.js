const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('pages', ['title', 'slug', 'content', 'is_visible', 'sort_order'], 'sort_order ASC');
