const mongoose = require("mongoose");
const { env } = require("./env");

async function connectDb() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongoUri);

  console.log("[db] MongoDB connected");
}

module.exports = { connectDb };
