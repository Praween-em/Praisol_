const makeCRUD = require('../crudFactory');
module.exports = makeCRUD('results', ['title', 'class_name', 'exam_name', 'result_file_url', 'description', 'is_published', 'published_at']);
