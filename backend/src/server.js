const { app } = require("./app");
const { env } = require("./config/env");
const { connectDb } = require("./config/db");

async function start() {
  try {
    await connectDb();

    app.listen(env.port, () => {
      console.log(`[backend] Server started on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("[backend] Failed to start:", err);
    process.exit(1);
  }
}

start();
