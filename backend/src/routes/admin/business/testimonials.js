const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('testimonials', ['customer_name', 'review', 'rating', 'photo_url', 'is_visible']);
