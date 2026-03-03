const express = require("express");
const cors = require("cors");

const { authRouter } = require("./routes/auth.routes");
const { errorHandler } = require("./middleware/errorHandler");
const { roomsRouter } = require("./routes/rooms.routes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use(errorHandler);

module.exports = { app };
