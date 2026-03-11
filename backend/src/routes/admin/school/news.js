const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('news', ['title', 'content', 'image_url', 'is_published', 'published_at']);
