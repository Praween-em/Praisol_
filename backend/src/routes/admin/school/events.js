const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('events', ['title', 'description', 'event_date', 'location', 'image_url', 'is_published'], 'event_date ASC');
