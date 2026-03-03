const express = require("express");
const { auth } = require("../middleware/auth");
const {
  listBookings,
  createBooking,
  deleteBooking,
} = require("../controllers/bookings.controller");

const router = express.Router();

router.get("/", auth, listBookings);
router.post("/", auth, createBooking);
router.delete("/:bookingId", auth, deleteBooking);

module.exports = { bookingsRouter: router };
