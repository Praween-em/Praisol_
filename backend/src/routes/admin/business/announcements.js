const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('announcements', ['message', 'is_active']);
