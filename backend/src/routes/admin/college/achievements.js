const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('achievements', ['title', 'description', 'date', 'image_url', 'is_published'], 'date DESC');
