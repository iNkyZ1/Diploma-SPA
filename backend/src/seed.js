const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { env } = require("./config/env");
const { connectDb } = require("./config/db");
const { User } = require("./models/User");
const { Room } = require("./models/Room");
const { Booking } = require("./models/Booking");

async function seedUsers() {
  const adminLogin = "admin";
  const userLogin = "user";

  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const userPasswordHash = await bcrypt.hash("user123", 10);

  await User.updateOne(
    { login: adminLogin },
    {
      $set: {
        login: adminLogin,
        passwordHash: adminPasswordHash,
        role: "admin",
      },
    },
    { upsert: true },
  );

  await User.updateOne(
    { login: userLogin },
    {
      $set: { login: userLogin, passwordHash: userPasswordHash, role: "user" },
    },
    { upsert: true },
  );

  console.log("[seed] Users upserted: admin/user");
}

function buildRooms() {
  const gallery = [
    "/images/rooms/room1.webp",
    "/images/rooms/room2.webp",
    "/images/rooms/room3.webp",
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const number = i + 1;
    const imgIndex = ((number - 1) % 3) + 1;

    return {
      number,
      title: `Номер #${number}`,
      description:
        "Уютный номер с базовыми удобствами для комфортного отдыха. Подходит для 1–2 гостей.",
      price: 3000 + number * 250,
      status: number <= 2 ? "reserved" : "available",
      image: `/images/rooms/room${imgIndex}.webp`,
      gallery,
      amenities: ["Wi-Fi", "TV", "Душ", "Полотенца"],
    };
  });
}

async function seedRooms() {
  await Room.deleteMany({});
  await Room.insertMany(buildRooms());
  console.log("[seed] Rooms created: 20");
}

async function cleanBookings() {
  await Booking.deleteMany({});
  console.log("[seed] Bookings cleared");
}

async function run() {
  try {
    console.log("[seed] Starting...");
    await connectDb();

    await seedUsers();
    await cleanBookings();
    await seedRooms();

    console.log("[seed] Done");
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error("[seed] Failed:", e);
    process.exit(1);
  }
}

run();
