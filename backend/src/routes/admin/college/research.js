const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('research', ['title', 'authors', 'journal', 'year', 'link'], 'year DESC');
