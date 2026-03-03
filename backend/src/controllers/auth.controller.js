const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { env } = require("../config/env");
const { User } = require("../models/User");
const { HttpError } = require("../utils/httpError");

function createToken(userId) {
  return jwt.sign({ userId }, env.jwtSecret);
}

async function register(req, res, next) {
  try {
    const { login, password } = req.body || {};

    if (!login || !password) {
      throw new HttpError(400, "Validation error", {
        fields: ["login", "password"],
      });
    }
    if (String(login).trim().length < 3)
      throw new HttpError(400, "Validation error", { fields: ["login"] });
    if (String(password).length < 6)
      throw new HttpError(400, "Validation error", { fields: ["password"] });

    const exists = await User.findOne({ login: String(login).trim() });
    if (exists) throw new HttpError(409, "Login already taken");

    const passwordHash = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      login: String(login).trim(),
      passwordHash,
      role: "user",
    });

    const token = createToken(user.id);

    res.json({
      token,
      user: { id: user.id, login: user.login, role: user.role },
    });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const { login, password } = req.body || {};

    if (!login || !password) {
      throw new HttpError(400, "Validation error", {
        fields: ["login", "password"],
      });
    }

    const user = await User.findOne({ login: String(login).trim() });
    if (!user) throw new HttpError(401, "Invalid credentials");

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) throw new HttpError(401, "Invalid credentials");

    const token = createToken(user.id);

    res.json({
      token,
      user: { id: user.id, login: user.login, role: user.role },
    });
  } catch (e) {
    next(e);
  }
}

async function me(req, res) {
  res.json(req.user);
}

module.exports = { register, login, me };
