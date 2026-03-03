function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Server error";

  const payload = { message };

  if (err.details) payload.details = err.details;

  res.status(status).json(payload);
}

module.exports = { errorHandler };
