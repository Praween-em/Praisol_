const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('notifications', ['title', 'message', 'attachment_url', 'is_important', 'is_published', 'published_at']);
