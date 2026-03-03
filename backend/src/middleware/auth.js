const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { User } = require("../models/User");
const { HttpError } = require("../utils/httpError");

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      throw new HttpError(401, "Unauthorized");
    }

    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      throw new HttpError(401, "Invalid token");
    }

    const user = await User.findById(payload.userId);
    if (!user) throw new HttpError(401, "Invalid token");

    req.user = { id: user.id, login: user.login, role: user.role };
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { auth };
