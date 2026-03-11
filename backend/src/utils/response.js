/**
 * Standard JSON response helpers.
 * All controllers should use these for consistent API responses.
 */
const ok = (res, data, meta = {}) =>
  res.status(200).json({ success: true, data, ...meta });

const created = (res, data) =>
  res.status(201).json({ success: true, data });

const badRequest = (res, message) =>
  res.status(400).json({ success: false, message });

const unauthorized = (res, message = 'Unauthorized') =>
  res.status(401).json({ success: false, message });

const forbidden = (res, message = 'Forbidden') =>
  res.status(403).json({ success: false, message });

const notFound = (res, message = 'Not found') =>
  res.status(404).json({ success: false, message });

const serverError = (res, message = 'Internal server error') =>
  res.status(500).json({ success: false, message });

module.exports = { ok, created, badRequest, unauthorized, forbidden, notFound, serverError };
