/**
 * Lambda entry point for the Express backend.
 * Used ONLY for AWS Lambda deployments (not local dev).
 *
 * Local dev:  npm run dev  → uses src/server.js (Express listen)
 * AWS Lambda: src/lambda.js → serverless-http wraps the Express app
 *
 * No business logic, routes, or middleware are changed here.
 */
require('dotenv').config();
const serverless = require('serverless-http');
const app = require('./app');

module.exports.handler = serverless(app);
