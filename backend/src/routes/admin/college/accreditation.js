const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('accreditation', ['body', 'grade', 'score', 'valid_until', 'certificate_url'], 'body ASC');
