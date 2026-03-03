const { HttpError } = require("../utils/httpError");

function requireAdmin(req, res, next) {
  if (!req.user) {
    return next(new HttpError(401, "Unauthorized"));
  }

  if (req.user.role !== "admin") {
    return next(new HttpError(403, "Forbidden"));
  }

  return next();
}

module.exports = { requireAdmin };
